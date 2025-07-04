# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a CSV sanitizer utility built with Bun and TypeScript. The project is designed to process and sanitize CSV files using Bun's native capabilities.

## Development Commands

### Setup
```bash
bun install
```

### Running the Application
```bash
bun run src/main.ts
```

### Code Quality
```bash
bun run check  # Run Biome linting and formatting
```

### Testing
```bash
bun test  # Run tests (when tests are added)
```

## Technology Stack

- **Runtime**: Bun (not Node.js)
- **Language**: TypeScript with strict configuration
- **Linting/Formatting**: Biome (configured in biome.json)
- **Module System**: ESNext with "Preserve" mode

## Architecture

- **Entry Point**: `src/main.ts` - Currently a placeholder, will contain the main CSV sanitization logic
- **Module Type**: ES modules with `.ts` extension imports allowed
- **TypeScript Config**: Strict mode enabled with bundler resolution

## Bun-Specific Patterns

- Use `Bun.file()` for file operations instead of Node.js fs
- Use `bun:sqlite` for database operations if needed
- Leverage Bun's built-in APIs for better performance
- No need for dotenv - Bun loads .env automatically

## Code Style (Biome Configuration)

- **Line Width**: 120 characters
- **Indentation**: Spaces
- **Strict Rules**: Parameter assignment errors, const assertions required
- **Console Logging**: Allowed (noConsole: off)
- **Import Organization**: Automatic on save

## Development Notes

- The project uses bundler module resolution with TypeScript extensions allowed
- Strict TypeScript configuration with noUncheckedIndexedAccess enabled
- Git integration enabled in Biome configuration
- No existing tests yet - use `bun test` with `bun:test` when adding tests