```sh
# Manual 
mkdir myapp
cd myapp
touch index.js
npm init -y
npm install express
node index.js

# Express application generator
npx express-generator
# install dependencies:
npm install
#run the app:
DEBUG=express-generator:* npm start
```