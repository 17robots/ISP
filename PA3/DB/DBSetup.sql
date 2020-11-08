-- file for db setup

CREATE USER 'librarian@localhost' IDENTIFIED BY 'librarian';

CREATE DATABASE zippybook;

CREATE TABLE books (
  id NOT NULL AUTO_INCREMENT,
  title varchar(255),
  price INT,
  quantity INT,
  discontinued BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
);

INSERT INTO books (title, price, quantity) VALUES ('How To Win Friends And Influence People', 10, 10);
INSERT INTO books (title, price, quantity) VALUES ('To Kill A Mockingbird', 5, 50);
INSERT INTO books (title, price, quantity) VALUES ('Old Yeller', 5, 50);


GRANT ALL PRIVILIGES ON "books" TO 'librarian@localhost';

