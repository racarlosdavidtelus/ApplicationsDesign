```sh
npm i -g nodemon

npm i --save-dev nodemon

nodemon app.js

REPL -> es un ambiente de programacion en el que puedo
escribir codigo, solo abro una terminal y escribo "node"
y puedo empezar a escribir codigo y voy a obtener las salidas

The REPL has some special commands, all starting with a dot .. They are

# .help: shows the dot commands help
# .editor: enables editor mode, to write multiline JavaScript code with ease. Once you are in this mode, enter ctrl-D to run the code you wrote.
# .break: when inputting a multi-line expression, entering the .break command will abort further input. Same as pressing ctrl-C.
# .clear: resets the REPL context to an empty object and clears any multi-line expression currently being input.
# .load: loads a JavaScript file, relative to the current working directory
# .save: saves all you entered in the REPL session to a file (specify the filename)
# .exit: exits the repl (same as pressing ctrl-C two times)

# Calculate the time spent
# You can easily calculate how much time a function takes to run, using time() and timeEnd()

# Para coloreal la salida 
npm install chalk
npm install progress

# Output
npm install inquirer

# Exports

#What's the difference between module.exports and exports?
The first exposes the object it points to. The latter exposes the properties of the object it points to.

--save-dev installs and adds the entry to the package.json file devDependencies
--no-save installs but does not add the entry to the package.json file dependencies
--save-optional installs and adds the entry to the package.json file optionalDependencies
--no-optional will prevent optional dependencies from being installed
Shorthands of the flags can also be used:

-S: --save
-D: --save-dev
-O: --save-optional

# Para saber donde esta la carpeta global de node modules
npm root -g

# Como ejecutar binarios en nodejs 
npx 

# Package json
version -> indicates the current version
name -> sets the application/package name
description -> is a brief description of the app/package
main -> sets the entry point for the application
private -> if set to true prevents the app/package to be accidentally published on npm
scripts -> defines a set of node scripts you can run
dependencies -> sets a list of npm packages installed as dependencies
devDependencies -> sets a list of npm packages installed as development dependencies
engines -> sets which versions of Node.js this package/app works on
browserslist -> is used to tell which browsers (and their versions) you want to support

# Install dependencies
npm install <PACKAGENAME>
yarn add <PACKAGENAME>

# Find the installed version of an npm package
npm list

# Para ver los modulos que tengo instalados de forma global
npm list -g 

npm view <PACKAGENAME> version

# Install an older version of an npm package
npm install <package>@<version>

# The Semantic Versioning concept is simple: all versions have 3 digits: x.y.z.
the first digit is the major version
the second digit is the minor version
the third digit is the patch version

# Let's see those rules in detail:

^: It will only do updates that do not change the leftmost non-zero number i.e there can be changes in minor version or patch version but not in major version. If you write ^13.1.0, when running npm update, it can update to 13.2.0, 13.3.0 even 13.3.1, 13.3.2 and so on, but not to 14.0.0 or above.
~: if you write ~0.13.0 when running npm update it can update to patch releases: 0.13.1 is ok, but 0.14.0 is not.
>: you accept any version higher than the one you specify
>=: you accept any version equal to or higher than the one you specify
<=: you accept any version equal or lower to the one you specify
<: you accept any version lower than the one you specify
=: you accept that exact version
-: you accept a range of versions. Example: 2.1.0 - 2.6.2
||: you combine sets. Example: < 2.1 || > 2.6

# Uninstalling npm packages
npm uninstall <package-name>
npm uninstall -g <package-name>

# npm global or local packages
es mejor que los paquete de los proyectos se instale local

"A package should be installed globally when it provides an executable command that you run from the shell (CLI), and it's reused across projects".

# npm dependencies and devDependencies
When you add the -D flag, or --save-dev, you are installing it as a development dependency, which adds it to the devDependencies list.

# The npx Node.js Package Runner
npx cowsay "Hello"
npx create-react-app my-react-app

```