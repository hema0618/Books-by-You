

-- Use database--
USE guupl4geewcrwvmw;
-- create a table for wishlist--
CREATE TABLE wishlist (
    id int(10) NOT NULL AUTO_INCREMENT PRIMARY_KEY,
    user_id char(30) DEFAULT NULL,
    rating char (10) NOT NULL,
    card_img Varchar(255) NOT NULL,
    titile Varchar (80) DEFAULT NULL,
    page_count int (300) NOT NULL
);

CREATE TABLE customer(
    Login_id Char(20) NOT NULL PRIMARY KEY,
    Name Varchar(60) DEFAULT NULL,
    password Varchar(16) DEFAULT NULL
   
);