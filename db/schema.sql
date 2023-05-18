DROP DATABASE IF EXISTS blogs_dev;
CREATE DATABASE blogs_dev;

\c blogs_dev;

CREATE TABLE blogs (
 id SERIAL PRIMARY KEY,
 title TEXT NOT NULL,
 img_url TEXT,
 body TEXT,
 author TEXT,
 date_created TEXT

);