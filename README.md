# Gulp Project

## 📌 Overview
This project uses Gulp to automate tasks such as processing HTML, compiling SCSS, concatenating JavaScript, copying assets, and running a live server with BrowserSync.

## 🚀 Features
- HTML processing with `gulp-file-include`
- SCSS compilation with `gulp-sass`
- JavaScript concatenation
- Autoprefixing for CSS
- Image and library file handling
- Live reload with `BrowserSync`

## 📂 Project Structure
```
project-root/
│── src/
│   ├── html/                # HTML partials
│   ├── scss/                # SCSS stylesheets
│   ├── js/                  # JavaScript files
│   ├── libs/                # Third-party libraries
│   ├── images/              # Image assets
│   └── index.html           # Main HTML file
│
│── docs/                    # Output directory
│
│── gulpfile.js              # Gulp configuration
│── package.json             # Node.js dependencies
│── README.md                # Project documentation
```

## 🔧 Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo-name.git
   cd your-repo-name
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```

## 📜 Available Gulp Tasks
| Command            | Description                                  |
|--------------------|----------------------------------------------|
| `gulp build`      | Runs all tasks to generate the output files  |
| `gulp` (default)  | Runs `build` and starts a live server        |

## 🛠 Usage
To start the development server with live reload, run:
```sh
gulp
```
This will watch for changes in SCSS, HTML, JS, and assets, recompile them, and refresh the browser automatically.

## 📜 License
This project is licensed under the MIT License.

