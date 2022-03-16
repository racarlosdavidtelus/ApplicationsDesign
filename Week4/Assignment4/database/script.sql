create database pokedex;
use pokedex;

create table user(
	id int not null primary key auto_increment,
    name varchar(50),
    password varchar(50),
    pokemon_trainer_nickname varchar(50),
    region_of_origin varchar(20),
    gender varchar(10),
    age int,
    email varchar(50),
    trainer_class varchar(20),
    url_photo varchar(200)
);

create table pokemon(
	id int not null primary key auto_increment,
    idPokemon int,
    name varchar(100) not null,
    types varchar(300),
    url_photo varchar(200),
    id_user int,
    foreign key (id_user) references user(id) ON DELETE CASCADE ON UPDATE CASCADE
);

SELECT * FROM user;
SELECT * FROM pokemon;
