# Character Unicode/ASCII Analyzer

A modern web application to analyze characters in text, showing Unicode, ASCII codes, and character types with a beautiful DaisyUI interface.

## Features

- 🔍 **Character Analysis**: Analyze each character in your text
- 📊 **Detailed Information**: Shows ASCII/UTF-16 codes, Unicode, hex values, and character types
- 🎯 **Character Classification**: Identifies ASCII, Unicode, Korean, special characters, whitespace, digits, and alphabets
- 🎨 **Multiple Themes**: Light, Dark, Cupcake, Synthwave, Cyberpunk themes with easy switching
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices  
- ⚡ **Fast & Modern**: Built with DaisyUI and Tailwind CSS for beautiful, modern UI
- 🎯 **Enhanced UX**: Loading animations, toast notifications, and smooth transitions
- 😊 **Emoji Support**: Full emoji character analysis and detection

## Usage

1. **Open the application**: Open `index.html` in your web browser
2. **Enter text**: Type or paste text in the textarea
3. **Analyze**: Click "Analyze Characters" button or press `Ctrl + Enter`
4. **View results**: See detailed analysis for each character

## Development

### Quick Start

```bash
# Clone or download the project
cd char_analyzer

# Start local development server
npm run dev
# or
npm start

# Open http://localhost:8080 (dev) or http://localhost:3000 (start)
```

### Project Structure

```
char_analyzer/
├── index.html          # Main HTML file
├── styles.css          # Modern shadcn-inspired styles
├── script.js           # Character analysis functionality
├── package.json        # Project configuration
└── README.md          # This file
```

### Scripts

- `npm run dev` - Start development server on port 8080
- `npm start` - Start production server on port 3000  
- `npm run serve` - Start server on default port
- `npm test` - Run tests (currently no tests defined)

**Note**: Make sure you have `serve` package available globally or it will be installed automatically via npx.

## Character Types

The analyzer identifies the following character types:

- **ASCII**: Characters with code points 0-127
- **Unicode**: Characters with code points above 127
- **Korean**: Korean characters including Hangul
- **Special**: Special characters and symbols
- **Whitespace**: Spaces, tabs, line breaks
- **Digits**: Number characters 0-9
- **Alphabets**: English letters a-z, A-Z
- **Emoji**: Emoji characters and symbols

## Technologies Used

- **HTML5**: Semantic markup
- **DaisyUI 5**: Modern CSS component library
- **Tailwind CSS 4**: Utility-first CSS framework
- **Vanilla JavaScript**: No dependencies, pure JavaScript
- **Responsive Design**: Built-in responsive grid system
- **Modern UI**: Beautiful DaisyUI components with multiple themes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.