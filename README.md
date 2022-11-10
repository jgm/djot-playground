# djot-playground

A web application that converts [djot](https://github.com/jgm/djot) to HTML.
This was formerly used at <https://djot.net/playground/>, but we have now
replaced the playground with a new one based on directly compiling to WASM.

The app uses the latest Lua source code from the main branch (loaded directly from GitHub).

This is a fork of the unmaintained dtinth/djot-playground.

## Build instructions

`make`, or follow these steps manually:

- Install Node.js (version 16 or above).
- Run `corepack enable` in a terminal to make the `yarn` command available.
- Run `yarn install` to install the project dependencies.
- Run `yarn build` to build the project.

The files will be in the `dist` directory.

