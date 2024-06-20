# Changelog

All notable changes to this project, starting with v0.1.1, are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Fixed

- Fix attribute indenting bug and include more examples in `basic.bell` sample.

### Changed

### Removed

## [0.1.7] - 19-06-2024

### Added

- Add missing direct in `dx` pattern in reserved variables.

### Fixed

- Fix merging parens bug and pre-format sample files.
- Fix bug in which `#!=` operator is parsed and highlighted as comment.

### Changed

### Removed

## [0.1.6] - 19-06-2024

### Added

- Automatically open sample files when using development host, for quick checks and tests.
- Support `#!` comment syntax for both formatting and highlighting.
- Support pitch syntax highlighting and formatting.

### Fixed

- Fix scope name in max files.
- Fix comment regex bug, which was breaking up #-type variables.
- Fix syntax highlighting conflict in regex for operators and numeric values.

### Changed

- Improve regex for numeric values (handling scientific notation better).
- Clean semantic names in TextMate grammars.
- Remove unary operators from functional form regex.

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
