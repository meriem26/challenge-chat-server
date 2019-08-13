CREATE TABLE chat (
  id       SERIAL PRIMARY KEY,
  name   VARCHAR(30) NOT NULL,
  text   VARCHAR(120) NOT NULL,
  time   TIMESTAMP default current_timestamp
 );

INSERT INTO chat( name, text ) VALUES ('John','Hi');