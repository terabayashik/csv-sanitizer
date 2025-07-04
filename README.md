# CSV Sanitizer

A CLI tool that sanitizes CSV files by wrapping all unquoted fields in double quotes while preserving already quoted fields.

## Features

- Wraps all unquoted CSV fields in double quotes
- Preserves already quoted fields (no double quoting)
- Handles empty fields by wrapping them in quotes
- Supports custom output file names
- Built with Bun for fast performance

## Installation

```bash
bun install
```

## Usage

### Basic usage
```bash
bun run src/main.ts input.csv
```
This creates `input_sanitized.csv` with all fields wrapped in double quotes.

### Custom output file
```bash
bun run src/main.ts input.csv -o output.csv
```

### Examples

**Input CSV:**
```csv
name,age,city,description
John,25,Tokyo,Engineer
"Jane",30,"New York",Manager
Bob,,London,
```

**Output CSV:**
```csv
"name","age","city","description"
"John","25","Tokyo","Engineer"
"Jane","30","New York","Manager"
"Bob","","London",""
```

## Processing Rules

- **Unquoted fields**: Wrapped in double quotes (`John` → `"John"`)
- **Already quoted fields**: Left unchanged (`"Jane"` → `"Jane"`)
- **Empty fields**: Wrapped in quotes (`` → `""`)
- **Empty lines**: Preserved as-is

## Development

### Code Quality
```bash
bun run check  # Run Biome linting and formatting
```

### Project Structure
```
src/
├── main.ts         # Entry point and CLI orchestration
├── cli.ts          # Command-line argument parsing
├── csvProcessor.ts # CSV field processing logic
├── fileUtils.ts    # File operations utilities
├── sanitizer.ts    # Main sanitization workflow
└── types.ts        # TypeScript type definitions
```

### Technology Stack
- **Runtime**: Bun
- **Language**: TypeScript
- **Linter/Formatter**: Biome
- **Module System**: ES modules

## Requirements

- Bun v1.2.17 or higher
- TypeScript 5.x

## License

This project was created using `bun init` with [Bun](https://bun.sh) runtime.