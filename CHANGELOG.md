# Changelog

All notable changes to this project, starting with v0.1.1, are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Automatically open sample files when using development host, for quick checks and tests.

### Fixed

- Fix scope name in max files.
- Fix comment regex bug, which was breaking up #-type variables.

### Changed

- Improve regex for numeric values (handling scientific notation better).
- Clean semantic names in TextMate grammars.

### Removed

## [0.1.5] - 18-06-2024

### Added

- Add basic syntax highlighting for max files.
- Add regex for variables assigned a max object instance.

### Fixed

- Fix semicolon removal bug — previously based on expression being last, now based on being the last non-comment or non-empty string.
- Fix undesired highlighting for local variables named after keywords.
- Treat include directive content as dead code by parser/formatter.

### Changed

- Improve regex for function definitions.
- Improve regex for max object syntax.

### Removed

## [0.1.4] - 17-06-2024

### Added

- Add GIF preview in README.md

### Fixed

- Fix snippet placeholder bug in `for` loop.
- Fixed parens removal bug when parens contains a lambda function.
- Fix bug in tick symbol highlighting regex.

### Changed

- Add highlighting rules to support reserved numbered variables, such as `i`, `f`, `l`, `p`, `r`, and `x`.

### Removed

## [0.1.3] - 15-06-2024

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
