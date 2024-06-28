# Test Component Library

This is a simple component library built to test out the library build mode of Vite.
It is built with React and TypeScript.

Tailwind CSS is used for styling.

I followed [this tutorial](https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma)
to get started, and adapted it to add Tailwind CSS.

The `vite-plugin-lib-inject-css` plugin is used to inject the CSS into the library build, meaning the consuming app
doesn't have to manually import the CSS itself.

`vite-plugin-dts` is used to generate TypeScript declaration files for the library.

To locally link the library to a consuming app for testing, do the following:
- Run `npm link` in the library directory.
- Run `npm link "@wjperkins/test-component-library"` in the consuming app directory.

## Known Issues
- The base Tailwind CSS preflight styles are included in the library build, and then leak out into the consuming
application. These are useful to have in the component library, but shouldn't also affect the consuming app. For now
this is ok as long as the consuming app is also using Tailwind CSS, but it's not ideal.
- A single `index.css` file is used to import all Tailwind CSS styles. Ideally, this would be split into separate files
for each component, and then only the necessary styles would be included in the library build.

## Next Steps
- Investigate how to isolate the Tailwind CSS preflight styles to the component library only.
- Make use of shadcn/ui components to build a more complex component library.
- Add tests and ensure they aren't included in the library build.
- Add Storybook for component documentation.