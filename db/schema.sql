-- Drop the database if exists--
DROP DATABASE IF EXISTS books_db;
-- create a database--
CREATE DATABASE books_db;

-- Use database--
USE books_db;

-- create a table for wishlist--
CREATE TABLE wishlist (
    id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id char(30) DEFAULT NULL,
    wishlist_id Varchar (255) NOT NULL,
    CONSTRANTS wishlist_id FOREIGN KEY
);

CREATE TABLE rating (
    Score int(11) DEFAULT NULL,
    Rater_id Char(10) NOT NULL,
    ratee_id char (10) NOT NULL,
    comments Varchar (200) DEFAULT NULL

);

CREATE TABLE customer(
    Login_id Char(20) NOT NULL PRIMARY KEY,
    Name Varchar(60) DEFAULT NULL,
    password Varchar(16) DEFAULT NULL,
    phone_num text,

)


