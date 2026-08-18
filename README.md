# Minify JS & CSS

A simple and fast Visual Studio Code extension to minify JavaScript and CSS files. It includes automatic resolution of local `@import` statements for CSS, bundling everything into a single output file.

## Features

* **Quick Minification:** Compresses both JS and CSS by removing unnecessary spaces, line breaks, and comments.
* **Resolve CSS `@import`:** Automatically reads local CSS files imported via `@import` and bundles them together.
* **CSS Path Rebase:** Corrects relative paths (like `background-image: url(...)`) so they don't break in the final minified file.
* **Smart Prevention:** Ignores files that already contain `.min` in their filename to prevent redundant minification.
* **Easy to Use:** Available directly in the VS Code Explorer context menu.

## How to Use

1. Open your project in VS Code.
2. Right-click on any `.js` or `.css` file in the Explorer sidebar.
3. Select **"Minify File (CSS/JS)"**.
4. A new `filename.min.js` or `filename.min.css` will be instantly generated in the same folder!

## Installation (VSIX)

1. Download the .vsix file from the Releases page of this repository.
2. Open VS Code and go to the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`).
3. Click the `...` menu in the top right corner of the Extensions view.
4. Select **"Install from VSIX..."** and choose the downloaded file.

## Built With

* [TypeScript](https://www.typescriptlang.org/)
* [Terser](https://github.com/terser/terser) - JavaScript parser and mangler/compressor toolkit.
* [clean-css](https://github.com/clean-css/clean-css) - Fast and efficient CSS optimizer.

## Author

**Rodrigo Pinto**
* Website: [rodrigofpinto.pt](https://rodrigofpinto.pt/)

## License

This project is licensed under the MIT License.