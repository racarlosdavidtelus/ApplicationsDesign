# Comandos

## POKEAPI APUNTES
```sh
url_base = https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126
me devuelve todos los pokemones pero solo hay que consultar hasta el 898 porque la otra
data esta de mas o algo asi 
url_base = https://pokeapi.co/api/v2/pokemon?offset=0&limit=898

cuando hago el fetch a cada pokemon obtengo un json con mucha data pero necesito:

la imagen esta en: sprites.other.dream_dream_world.front_default 
tipo de pokemon : types //es un array


```

## frontend
```sh
npx create-react-app pokedex
cd pokedex
npm start
```

## backend
```sh
mkdir backend
cd backend
npm init -y
npm install express mysql cors morgan dotenv nodemon
touch index.js
node index.js

```

SIGNUP
name,
pokemon_trainer_nickname, 
region_of_origin, 
gender, 
age, 
email,
trainer_class (battle or show)

"name": "Ash Ketchum"
"pokemon_trainer_nickname": "ash"
"region_of_origin": "kanto"
"gender": "male"
"age": 10
"email": "ashketchum@gmail.com"
"trainer_class": "battle"