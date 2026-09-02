# Colorly

A lightweight color utility built with vanilla JavaScript.

Colorly allows you to generate random colors, explore different color formats, create color palettes, check WCAG contrast ratios, extract colors from images, and save your favorite colors.

## Features

- Generate random colors
- Convert colors between HEX, RGB and HSL
- View RGB channel values
- Keep a history of generated colors
- Save and manage favorite colors
- Generate different types of color palettes:
  - Monochromatic
  - Complementary
  - Analogous
  - Shades

- Copy colors and palette values to the clipboard
- Check color contrast according to WCAG guidelines
- Extract dominant colors from uploaded images
- Store history and favorites using Local Storage
- Responsive design

## Built With

- HTML5
- CSS3
- JavaScript (ES Modules)
- Local Storage
- Canvas API

## Getting Started

Clone the repository:

```bash
git clone https://github.com/juanfeoru/colorly.git
```

Open the project and run it with a local development server.

No build tools or frameworks are required.

## How It Works

Colorly keeps colors internally as RGB objects and converts them to other formats when they need to be displayed.

The application uses JavaScript modules to separate responsibilities such as color generation, conversion, palette generation, storage, UI updates, and image color extraction.

User data such as color history and favorites is persisted with the browser's Local Storage API.

The image extractor uses the Canvas API to analyze image pixels and identify the most frequent color groups.

## Accessibility

The contrast checker evaluates color combinations using WCAG contrast ratio requirements and reports whether they meet AA and AAA criteria for normal and large text.

## Status

Colorly is an ongoing project built as a practical frontend project to improve my JavaScript skills, modular architecture, UI development, and working with browser APIs.

## License

This project is open source and available under the MIT License.
