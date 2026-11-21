import { execFileSync } from 'node:child_process'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

const root = process.cwd()
const issueTemplatePath = path.join(root, '.github/ISSUE_TEMPLATE/bug-report.md')
const changelogPath = path.join(root, 'CHANGELOG.md')
const packagePath = path.join(root, 'package.json')
const lockPath = path.join(root, 'package-lock.json')

const options = parseArgs(process.argv.slice(2))
const modes = ['resolve', 'prepare', 'build'].filter((mode) => options[mode] === true)

if (modes.length !== 1) {
  throw new Error(
    'Use --resolve --bump <type> --preid <identifier>, --prepare --version <version>, or --build.',
  )
}

const packageJson = await readJson(packagePath)
const currentVersion = packageJson.version

if (options.resolve) {
  const nextVersion = incrementVersion(currentVersion, options.bump, options.preid)
  console.log(validateVersion(nextVersion, currentVersion))
} else if (options.prepare) {
  const version = validateVersion(options.version, currentVersion)
  await prepareRelease(version, currentVersion)
  await buildProject()
} else {
  await buildRelease()
}

function parseArgs(argv) {
  const result = {}

  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index]

    if (!argument.startsWith('--')) {
      throw new Error(`Unexpected argument: ${argument}`)
    }

    const key = argument.slice(2)

    if (['resolve', 'prepare', 'build'].includes(key)) {
      result[key] = true
      continue
    }

    const value = argv[index + 1]

    if (!value || value.startsWith('--')) {
      throw new Error(`Missing value for --${key}`)
    }

    result[key] = value
    index++
  }

  return result
}

function parseVersion(version) {
  if (typeof version !== 'string') {
    throw new Error(`Invalid version: ${version}`)
  }

  const match = version.match(
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/,
  )

  if (!match) {
    throw new Error(`Invalid semantic version: ${version}`)
  }

  const prerelease = match[4]
    ? match[4].split('.').map((identifier) => {
        if (/^\d+$/.test(identifier)) {
          if (identifier.length > 1 && identifier.startsWith('0')) {
            throw new Error(`Invalid numeric prerelease identifier in ${version}`)
          }

          return BigInt(identifier)
        }

        return identifier
      })
    : []

  return {
    major: BigInt(match[1]),
    minor: BigInt(match[2]),
    patch: BigInt(match[3]),
    prerelease,
    build: match[5] ?? '',
  }
}

function compareVersions(leftVersion, rightVersion) {
  const left = parseVersion(leftVersion)
  const right = parseVersion(rightVersion)

  for (const key of ['major', 'minor', 'patch']) {
    if (left[key] > right[key]) return 1
    if (left[key] < right[key]) return -1
  }

  if (!left.prerelease.length && !right.prerelease.length) return 0
  if (!left.prerelease.length) return 1
  if (!right.prerelease.length) return -1

  const length = Math.max(left.prerelease.length, right.prerelease.length)

  for (let index = 0; index < length; index++) {
    const a = left.prerelease[index]
    const b = right.prerelease[index]

    if (a === undefined) return -1
    if (b === undefined) return 1
    if (a === b) continue

    const aNumeric = typeof a === 'bigint'
    const bNumeric = typeof b === 'bigint'

    if (aNumeric && bNumeric) return a > b ? 1 : -1
    if (aNumeric) return -1
    if (bNumeric) return 1

    return a > b ? 1 : -1
  }

  return 0
}

function formatVersion({ major, minor, patch, prerelease }) {
  const suffix = prerelease.length
    ? `-${prerelease.map((identifier) => identifier.toString()).join('.')}`
    : ''

  return `${major}.${minor}.${patch}${suffix}`
}

function incrementVersion(currentVersion, bump, preid = 'beta') {
  const version = parseVersion(currentVersion)
  let { major, minor, patch, prerelease } = version

  if (
    !['patch', 'minor', 'major', 'prepatch', 'preminor', 'premajor', 'prerelease'].includes(bump)
  ) {
    throw new Error(`Unsupported version bump: ${bump}`)
  }

  if (preid && !/^[0-9A-Za-z-]+$/.test(preid)) {
    throw new Error(`Invalid prerelease identifier: ${preid}`)
  }

  switch (bump) {
    case 'major':
      if (minor !== 0n || patch !== 0n || prerelease.length === 0) {
        major++
      }

      minor = 0n
      patch = 0n
      prerelease = []
      break

    case 'minor':
      if (patch !== 0n || prerelease.length === 0) {
        minor++
      }

      patch = 0n
      prerelease = []
      break

    case 'patch':
      if (prerelease.length === 0) {
        patch++
      }

      prerelease = []
      break

    case 'premajor':
      major++
      minor = 0n
      patch = 0n
      prerelease = [preid || 0n, 0n]
      break

    case 'preminor':
      minor++
      patch = 0n
      prerelease = [preid || 0n, 0n]
      break

    case 'prepatch':
      patch++
      prerelease = [preid || 0n, 0n]
      break

    case 'prerelease':
      if (!prerelease.length) {
        patch++
        prerelease = [preid || 0n, 0n]
      } else {
        if (preid && prerelease[0] !== preid) {
          prerelease = [preid, 0n]
        } else {
          let numericIndex = -1

          for (let index = prerelease.length - 1; index >= 0; index--) {
            if (typeof prerelease[index] === 'bigint') {
              numericIndex = index
              break
            }
          }

          if (numericIndex === -1) {
            prerelease.push(0n)
          } else {
            prerelease[numericIndex]++
          }
        }
      }
      break
  }

  return formatVersion({ major, minor, patch, prerelease })
}

function validateVersion(version, previousVersion) {
  parseVersion(version)

  if (compareVersions(version, previousVersion) <= 0) {
    throw new Error(
      `Version must be valid and greater than ${previousVersion}. Received: ${version}`,
    )
  }

  return version
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'))
}

async function writeJson(file, value) {
  await fs.writeFile(file, `${JSON.stringify(value, null, 2)}\n`)
}

async function prepareRelease(version, previousVersion) {
  const changelog = await fs.readFile(changelogPath, 'utf8')
  const wipHeading = /^## WIP[\t ]*$/m

  if (!wipHeading.test(changelog)) {
    throw new Error('CHANGELOG.md must contain a WIP section before preparing a release.')
  }

  const date = new Date().toISOString().slice(0, 10)
  const updatedChangelog = changelog.replace(wipHeading, `## [${version}] (${date})`)

  releaseNotes(updatedChangelog, version)

  packageJson.version = version
  await writeJson(packagePath, packageJson)

  try {
    const lockfile = await readJson(lockPath)

    lockfile.version = version

    if (lockfile.packages?.['']) {
      lockfile.packages[''].version = version
    }

    await writeJson(lockPath, lockfile)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }

  await fs.writeFile(changelogPath, updatedChangelog)

  try {
    const issueTemplate = await fs.readFile(issueTemplatePath, 'utf8')

    if (issueTemplate.includes(previousVersion)) {
      await fs.writeFile(issueTemplatePath, issueTemplate.replace(previousVersion, version))
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
}

function releaseNotes(changelog, version) {
  const lines = changelog.split(/\r?\n/)

  const headingIndex = lines.findIndex((line) =>
    new RegExp(`^## \\[${escapeRegExp(version)}\\] \\([^)]*\\)$`).test(line),
  )

  if (headingIndex === -1) {
    throw new Error(`No changelog section found for ${version}.`)
  }

  const notes = []

  for (let index = headingIndex + 1; index < lines.length; index++) {
    if (lines[index].startsWith('## ')) break
    notes.push(lines[index])
  }

  const result = notes.join('\n').trim()

  if (!result) {
    throw new Error(`No changelog notes found for ${version}.`)
  }

  return result
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

async function buildProject() {
  // Vue's Vite build replaces Core's compile/build-scss commands.
  // build-only runs Vite without vue-tsc.
  execFileSync('npm', ['run', 'build-only'], {
    cwd: root,
    stdio: 'inherit',
  })
}

async function buildRelease() {
  const version = packageJson.version
  const previousSha = process.env.RELEASE_BASE_SHA
  const releaseBranch = process.env.RELEASE_BRANCH

  if (!previousSha || !releaseBranch) {
    throw new Error('RELEASE_BASE_SHA and RELEASE_BRANCH are required for --build.')
  }

  const previousPackage = JSON.parse(
    execFileSync('git', ['show', `${previousSha}:package.json`], {
      cwd: root,
      encoding: 'utf8',
    }),
  )

  validateVersion(version, previousPackage.version)

  const tag = `v${version}`

  if (releaseBranch !== `release/${tag}`) {
    throw new Error(`Release branch must be release/${tag}; received ${releaseBranch}.`)
  }

  await buildProject()

  const notes = releaseNotes(await fs.readFile(changelogPath, 'utf8'), version)

  const asset = await createReleaseAsset(version)

  const tempDirectory = process.env.RUNNER_TEMP || os.tmpdir()
  await fs.mkdir(tempDirectory, { recursive: true })

  const notesFile = path.join(tempDirectory, `prkit-vue-${version}-notes.md`)

  await fs.writeFile(notesFile, `${notes}\n`)

  const outputFile = process.env.GITHUB_OUTPUT

  if (!outputFile) {
    throw new Error('GITHUB_OUTPUT is not set; --build must run inside GitHub Actions.')
  }

  const isPrerelease = parseVersion(version).prerelease.length > 0

  await fs.appendFile(
    outputFile,
    `tag=${tag}\nasset=${asset}\nnotes-file=${notesFile}\nprerelease=${isPrerelease}\n`,
  )
}

async function createReleaseAsset(version) {
  const distDirectory = path.join(root, 'dist')
  const entries = await fs.readdir(distDirectory)

  if (!entries.length) {
    throw new Error('The Vue build produced an empty dist directory.')
  }

  const tempDirectory = process.env.RUNNER_TEMP || os.tmpdir()
  await fs.mkdir(tempDirectory, { recursive: true })

  const archive = path.join(tempDirectory, `prkit-vue-${version}.tar.gz`)

  await fs.rm(archive, { force: true })

  // tar is available on GitHub's ubuntu-latest runner.
  execFileSync('tar', ['-czf', archive, '-C', distDirectory, '.'], {
    cwd: root,
    stdio: 'inherit',
  })

  return archive
}
