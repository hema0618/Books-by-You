CREATE 

-- Use database--
USE guupl4geewcrwvmw;
-- create a table for wishlist--
CREATE TABLE wishlist (

    id int(10) NOT NULL AUTO_INCREMENT PRIMARY_KEY,
    user_id char(30) NOT NULL,
    rating char (10) NOT NULL,
    card_img Varchar(255) NOT NULL,
    title Varchar (255) NOT NULL,
    page_count int (255) NOT NULL,
    author Varchar (255) NOT NULL,
    price Varchar (255) NOT NULL,
    buy_link Varchar(255) DEFAULT NULL
);


