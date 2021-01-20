-- seed file for creating the correct database in case of typos or not matching the database on app.py
-- better to run the seed file rather than using an existing databse

DROP DATABASE IF EXISTS flask_feedback;

CREATE DATABASE flask_feedback;

\c flask_feedback

CREATE TABLE users
(
  username TEXT NOT NULL PRIMARY KEY,
  password TEXT NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
 last_name TEXT NOT NULL
);