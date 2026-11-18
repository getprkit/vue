# PrKit Vue

A Vue 3 component library built on top of PrKit Core.

> **Status:** Under active development. The library is not yet ready for production use.

Since all developers need some tools to speed up their work, we came up with the idea of creating a framework based on UIkit that is structured in Vue, making it easier to implement the UI of our projects. in future, we will also use AI to use this template to create ui.

For the core, we forked the UIkit CSS framework because, unlike modern libraries, it offers many additional features like Slideshow, Parallax, and more.

## Overview

PrKit Vue provides reusable Vue 3 components powered by PrKit Core. It combines Vue's Composition API and TypeScript with PrKit's styling system and JavaScript functionality to build flexible and performant user interfaces.

The project focuses on modularity, predictable component APIs, and keeping production bundles lightweight.

## Current Status

The following components have completed implementations and documentation:

- Accordion
- Alert

Additional components are currently under development.

## Features

- Vue 3 and Composition API
- TypeScript support
- Integration with PrKit Core
- Reusable component architecture
- Customizable component styles and variants
- Performance-focused implementation
- Icon integration and selective icon compilation

## Development Setup

### Requirements

- Node.js 22.18.x or 24.12+
- npm

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The development application includes the component documentation and examples at `/docs`.

### Type Checking

```bash
npm run type-check
```

### Production Build

```bash
npm run build
```

### Unit Tests

```bash
npm run test:unit
```

### End-to-End Tests

```bash
npm run test:e2e:dev
```

### Lint

```bash
npm run lint
```

### Format

```bash
npm run format
```

## Project Documentation

- [Architecture](ARCHITECTURE.md)
- [Contributing](CONTRIBUTING.md)
- [Roadmap](ROADMAP.md)
- [Changelog](CHANGELOG.md)

## Development Guides

- [Component Development](docs/development/component-development.md)
- [Core Integration](docs/development/core-integration.md)
- [Icon System](docs/development/icon-system.md)
- [Styling](docs/development/styles.md)
- [Documentation System](docs/development/documentation-system.md)

## License

See the repository's license information.
