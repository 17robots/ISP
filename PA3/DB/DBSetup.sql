-- file for db setup

CREATE DATABASE zippybook;

use zippybook;

CREATE USER 'librarian'@'localhost' IDENTIFIED WITH mysql_native_password BY 'librarian';GRANT ALL PRIVILEGES ON *.* TO 'librarian'@'localhost';


create table books (
  id int not null AUTO_INCREMENT primary key,
  title varchar(255),
  price int,
  quantity int,
  discontinued boolean default false
);

INSERT INTO books (title, price, quantity) VALUES ('How To Win Friends And Influence People', 10, 10);
INSERT INTO books (title, price, quantity) VALUES ('To Kill A Mockingbird', 5, 50);
INSERT INTO books (title, price, quantity) VALUES ('Old Yeller', 5, 50);