# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern web application called "Character Unicode/ASCII Analyzer" - an internationalized tool that analyzes text characters and displays detailed information including Unicode values, ASCII codes, and character classifications. The application supports analysis of multiple languages including Korean, English, and other Unicode characters.

**Tech Stack:**
- Pure HTML5, CSS3, and vanilla JavaScript (no frameworks)
- DaisyUI 5 for UI components
- Tailwind CSS 4 for styling
- Static site served via GitHub Pages

## Development Commands

### Local Development
```bash
# Start development server (port 8080)
npm run dev

# Start production server (port 3000)
npm start

# Start server on default port
npm run serve

# Check available commands
npm run
```

**Note:** All commands use `npx serve` - no build step required as this is a static site.

## Application Architecture

### Core Structure
```
char_analyzer/
├── index.html          # Main application entry point
├── script.js          # Character analysis logic and UI interactions
├── styles.css         # Custom DaisyUI/Tailwind overrides
├── package.json       # NPM configuration (serve scripts only)
├── robots.txt         # SEO configuration
├── sitemap.xml        # Search engine sitemap
└── googlef2ea87898abad19d.html  # Google site verification
```

### Key Components

**Character Analysis Engine** (`script.js`):
- `analyzeText()`: Main analysis function that processes input text
- `getCharTypes()`: Character classification (ASCII/Unicode, Korean, emoji, etc.)
- `createCharCard()`: Generates individual character display cards
- `createSummary()`: Statistical analysis of character distribution

**UI System**:
- Theme management (light/dark with localStorage persistence)
- Toast notifications for user feedback
- Loading states and animations
- Responsive grid layout for character cards
- Real-time character count updates

**Character Classification Types**:
- ASCII (0-127) vs Unicode (>127)
- Korean characters (한글): `[가-힣ㄱ-ㅎㅏ-ㅣ]`
- Emoji detection using Unicode properties
- Special characters, whitespace, digits, alphabets

### Key Features

1. **Multi-language Support**: English UI with support for analyzing Korean, English, and Unicode characters
2. **Comprehensive Character Analysis**: Shows position, character, ASCII/UTF-16 code, hex, Unicode
3. **Theme System**: Light/dark themes with smooth transitions
4. **Responsive Design**: Mobile-first with adaptive layouts
5. **SEO Optimized**: Meta tags, Open Graph, Twitter cards
6. **Performance**: Simulated loading (300ms) for better UX

### Development Patterns

**State Management**: Uses localStorage for theme persistence, DOM manipulation for UI updates

**Event Handling**: 
- `Ctrl + Enter` keyboard shortcut for quick analysis
- Theme toggle persistence
- Real-time input character counting

**Character Processing**:
- Uses `charCodeAt()` for ASCII/UTF-16 values
- Uses `codePointAt()` for Unicode code points
- Regex patterns for character type classification
- Special handling for whitespace characters (space, tab, newline)

**UI Patterns**:
- DaisyUI card components for character display
- Badge system for character type indicators
- Stats component for summary information
- Toast notifications for user feedback

### Important Implementation Notes

1. **No Build Process**: This is a static site - edit files directly
2. **CDN Dependencies**: Uses DaisyUI and Tailwind via CDN (no local dependencies)
3. **Internationalized**: UI text is in English for global accessibility while maintaining Korean character analysis capabilities
4. **GitHub Pages Ready**: Configured for static hosting with proper SEO files
5. **Accessibility**: Uses semantic HTML and proper ARIA patterns via DaisyUI

### Testing

Currently no automated tests - testing is done manually through the web interface. To test character analysis:

1. Use mixed content: `"Hello 안녕하세요! 123 @#$ 😊"`
2. Test edge cases: whitespace, special Unicode characters
3. Verify theme switching works
4. Test responsive layout on different screen sizes

### SEO & Deployment

- **Google Verification**: `googlef2ea87898abad19d.html`
- **Robots.txt**: Configured to allow all crawlers
- **Sitemap**: Single page sitemap with priority 1.0
- **Meta Tags**: Full Open Graph and Twitter card support
- **Canonical URL**: Points to GitHub Pages deployment