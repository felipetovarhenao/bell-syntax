# Changelog

All notable changes to this project, starting with v0.1.1, are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Fixed

- Fix formatting bug in which pre-parens spaces are eliminated, forcing unwanted function call syntax.

### Changed

- Change names of callback functions:
  - `replaceTree` -> `formatTree`
  - `findMatchingBracket` -> `findNestableClosure`
  - `findEnd` -> `findClosure`.

### Removed

## [0.1.2] - 15-06-2024

### Added

- Syntax highlighting.
- Rudimentary code auto-formatting.
- Intellisense for all native `bell` functions — this includes completion suggestions, and hover-based documentation for both functions and arguments.

### Fixed

### Changed

- Handle `@` attributes separately in tree parser and include indentation rules based on them.

### Removed
