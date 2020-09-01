-- Drop the database if exists--
DROP DATABASE IF EXISTS books_db;
-- create a database--
CREATE DATABASE books_db;

-- Use database--
USE books_db;

-- create a table for wishlist--
CREATE TABLE wishlist (
    id int(10) NOT NULL AUTO INCREMENT PRIMARY KEY,
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

CREATE TABLE Customers (
    customer_ID varchar (60) NOT NULL PRIMARY KEY,
    First_name Varchar(60),
    Last_name Varchar(60),
    Customer_email Varchar(60),
    Customer_phone Varchar(60) NOT NULL
)



