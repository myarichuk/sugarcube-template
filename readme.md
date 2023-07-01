# Sugarcube Template Project

This is a template for interactive fiction projects using the [Sugarcube](http://www.motoslave.net/sugarcube/2/) story format. It utilizes modern development practices and tools such as [Webpack](https://webpack.js.org/) for bundling assets, [Sass](https://sass-lang.com/) for styling, and [TypeScript](https://www.typescriptlang.org/) for writing reliable JavaScript code.

## Getting Started

Before you can start using the template, you'll need to install [Node.js](https://nodejs.org/) and [NPM](https://www.npmjs.com/). Once they're installed, you can clone this repository to your local machine.

```bash
git clone https://github.com/yourusername/sugarcube-template.git
cd sugarcube-template
```

## Project Setup

You'll need to run the setup script to get started. This will install the `tweego` story compiler, as well as all the necessary NPM packages for development.

```bash
npm install
npm run setup
```

## Adding TypeScript and Sass Files

To add your custom TypeScript or Sass files to the project, follow these steps:

1. Create your `.ts` or `.scss` file in the `src/scripts` or `src/styles` directory respectively.
2. Import the created file into your `index.ts` file.

For TypeScript:

```ts
import './yourfile.ts';
```

For Sass:

```ts
import '../styles/yourfile.scss';
```

Webpack will then automatically include these files when compiling your project.

## Running the Project

You can start a local development server using the following command:

```bash
npm start
```

This will start the Webpack development server, which will automatically recompile your project whenever you save a file. You can view the project by opening a web browser and navigating to `http://localhost:8080`.

## Building the Project

To create a production-ready build of your project, use the build command:

```bash
npm run build
```

This will create a `dist` folder with all the compiled assets ready for deployment.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

* The [Sugarcube](http://www.motoslave.net/sugarcube/2/) story format.
* [Webpack](https://webpack.js.org/) for bundling assets.
* [Sass](https://sass-lang.com/) for extending CSS capabilities.
* [TypeScript](https://www.typescriptlang.org/) for improving JavaScript reliability.

## Notes

* Please replace `"https://github.com/yourusername/sugarcube-template.git"` with the actual repository URL
* Please replace `ifid` in `src/story/StoryData.twee` with appropriate data