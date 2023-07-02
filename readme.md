# Sugarcube Interactive Fiction Project Template

This template aids in the creation of interactive fiction projects using the [Sugarcube](http://www.motoslave.net/sugarcube/2/) story format. It incorporates modern development practices and tools, including [Webpack](https://webpack.js.org/) for bundling assets, [Sass](https://sass-lang.com/) for styling, and [TypeScript](https://www.typescriptlang.org/) for enhanced JavaScript coding reliability.

## Features

- **Sugarcube Story Format**: Develop your interactive fiction with the popular Sugarcube story format that provides powerful capabilities for story and world-building.
- **Webpack Bundling**: Streamlines the development process by bundling your JavaScript, TypeScript, CSS, and SASS files. It also provides hot-reload functionality for an efficient development experience.
- **TypeScript and Sass Support**: Write reliable JavaScript code with TypeScript and extend your CSS capabilities with Sass. This project is configured to handle and bundle these files effectively.
- **Development Server**: Comes with a ready-to-use local development server that provides live reloading as you develop your interactive fiction.
- **Ready for Production**: This template includes scripts to bundle your project into a production-ready format.
- **Extendable**: The project is set up in a manner that allows for easy extension and inclusion of additional features, such as custom styling or additional custom macros

## Prerequisites

Before using this template, ensure you have [Node.js](https://nodejs.org/) and [NPM](https://www.npmjs.com/) installed.

## Initialization

To start, clone this repository onto your local machine and navigate into the directory.

```bash
git clone https://github.com/yourusername/sugarcube-template.git
cd sugarcube-template
```
*Note*: Please replace `"https://github.com/yourusername/sugarcube-template.git"` with your actual repository URL.

Run the setup script for the installation of the `tweego` story compiler and necessary NPM packages.

```bash
npm install
```

## Project Structure and Customization

### TypeScript and Sass Files

You can add custom TypeScript or Sass files by:

1. Creating your `.ts` or `.scss` files in the `src/scripts` or `src/styles` directories respectively.
2. Importing these files into your `index.ts` file.

For TypeScript:

```ts
import './yourfile.ts';
```

For Sass:

```ts
import '../styles/yourfile.scss';
```

Webpack will automatically incorporate these files during the project compilation process.

### Story Title and IFID

To modify the story title and Interactive Fiction Identifier (IFID), you'll need to edit the `src/story/StoryData.twee` file:

```twee
::StoryTitle
Your Story Title

:: StoryData
{
	"ifid": "YOUR-IFID",
	"format": "SugarCube",
	"format-version": "2.30.0"
}
```

Replace `"Your Story Title"` and `"YOUR-IFID"` with your actual story title and IFID, respectively.

To generate a new IFID, you can use an online UUID generator, like [this one](https://www.uuidgenerator.net/). The IFID is a unique identifier for your story and helps differentiate it from other interactive fiction stories.

## Project Operations

### Starting the Project

Run the local development server using:

```bash
npm start
```

This command triggers the Webpack development server to automatically recompile your project upon file modifications. You can view your project at `http://localhost:8080`.

### Building the Project

To compile a production-ready version of your project, run:

```bash
npm run build
```

This process generates a `dist` directory, holding all the compiled assets ready for deployment.

## Adding Custom CSS/Sass

1. Create your custom `.scss` or `.css` files within the `src/styles` directory.
   
2. Import the newly created file in your `index.ts` file as follows:

```ts
import '../styles/yourfile.scss'; // for Sass
import '../styles/yourfile.css'; // for CSS
```

Webpack will automatically bundle these files during the project compilation.

## Creating Custom TypeScript or JavaScript Macros

Sugarcube allows you to create custom macros using JavaScript, which can then be used in your `.twee` files. Here's a guide on how to create and use them:

1. Create a new `.ts` (or `.js` for JavaScript) file in the `src/scripts` directory.

2. Write your custom macro in that file. Here's an example:

```ts
import { Macro } from "twine-sugarcube";

Macro.add('myCustomMacro', {
    handler: function() {
        // Your macro code goes here
        this.output('Hello from my custom macro!');
    }
});
```
For CommonJS modules, use the `require` syntax instead:

```js
const Macro = require("twine-sugarcube").Macro;

Macro.add('myCustomMacro', {
    handler: function() {
        // Your macro code goes here
        this.output('Hello from my custom macro!');
    }
});
```

3. Import this file into your `index.ts` file:

```ts
import './yourfile.ts';
```

4. Now, you can use this macro in your `.twee` files like so:

```twee
<<myCustomMacro>>
```

Webpack will automatically bundle these files during the project compilation.

Please note that the `Macro.add` function used in the example above is part of the Sugarcube macro API. You can find more information about it in the [Sugarcube documentation](https://www.motoslave.net/sugarcube/2/docs/macros.html#macro-api).

## Integrating Third-Party JavaScript Macros

1. Download or copy the macro file into your project. Ideally, you should place this in a dedicated directory, like `src/scripts/macros`.

2. Import the macro file in your `index.ts` file, as shown below:

```ts
import './macros/third-party-macro.js';
```

If the macro you're integrating is a CommonJS module, you might need to adjust its syntax to ensure compatibility with the ES6 modules system. You can use the `require` syntax:

```ts
const thirdPartyMacro = require('./macros/third-party-macro');
```

Alternatively, if the macro is a package available on NPM, you can install it using NPM and then import it in your `index.ts`:

```bash
npm install macro-package-name
```

Then, in your `index.ts`:

```ts
import 'macro-package-name';
```

3. After integrating the macro into your project, you can use it in your `.twee` files as directed by the macro's documentation.

Webpack will bundle these files during the project compilation, so they're ready to use in your project.

Please note that the process might vary slightly depending on the particular macro you're integrating. Always refer to the specific instructions provided by the macro's author when available.

## Note on Modules: CommonJS vs ES6

This project uses ES6 modules, which are statically loaded and allow for static analysis and tree shaking, resulting in potentially smaller bundle sizes and better performance. 

ES6 modules differ from CommonJS modules, traditionally used in Node.js, in their loading mechanism and syntax. While CommonJS modules support dynamic loading of modules, ES6 modules require the module structure (imports and exports) to be determinable without executing the code.

While it is technically possible to use both CommonJS and ES6 modules in a project, doing so can introduce complexities and compatibility issues. Therefore, for simplicity and to take advantage of the benefits of ES6 modules, this project supports and recommends using only ES6 modules.

For those modules only available in CommonJS format, consider using dynamic `import()` syntax to load them, or seek an ES6-compatible alternative if one is available.

Always refer to the most current and authoritative sources when configuring your project, as practices can evolve over time.

## Project Support for ES6

This project primarily supports ES6 syntax. While you may be able to integrate CommonJS modules, I would recommend sticking to ES6 modules to ensure compatibility and take advantage of ES6 benefits. If you wish to use a package that only provides a CommonJS module, please consider looking for an alternative that supports ES6 or use dynamic import (`import()`) syntax to load it. Please note that this might require additional configuration and may not work out-of-the-box.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project falls under the MIT License - see the [LICENSE.md](LICENSE.md) file for specifics.

## Credits

* The [Sugarcube](http://www.motoslave.net/sugarcube/2/) story format.
* [Webpack](https://webpack.js.org/) for bundling assets.
* [Sass](https://sass-lang.com/) for its CSS extension capabilities.
* [TypeScript](https://www.typescriptlang.org/) for improved JavaScript dependability.
