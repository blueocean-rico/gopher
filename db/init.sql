DROP DATABASE IF EXISTS gopher;
CREATE DATABASE gopher;

\c gopher

CREATE TABLE users (
  id integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  email text NOT NULL,
  nickname text NOT NULL,
  picture text
);

CREATE TABLE lists (
  id integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  created_at timestamp with time zone DEFAULT current_timestamp
);

CREATE TABLE calendar (
  id integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  user_id integer NOT NULL REFERENCES lists ON DELETE CASCADE,
  date text NOT NULL,
  year text NOT NULL,
  day integer NOT NULL
);

CREATE TABLE lists_users (
  id integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  user_id integer NOT NULL REFERENCES users ON DELETE CASCADE,
  list_id integer NOT NULL REFERENCES lists ON DELETE CASCADE
  gopher boolean NOT NULL DEFAULT false
);

CREATE TABLE list_items (
  id integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  list_id integer NOT NULL REFERENCES lists ON DELETE CASCADE,
  name text NOT NULL,
  price numeric,
  active boolean NOT NULL DEFAULT true
);

CREATE TABLE list_items_users (
  id integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  list_item_id integer NOT NULL REFERENCES list_items ON DELETE CASCADE,
  user_id integer NOT NULL REFERENCES users,
  active boolean NOT NULL DEFAULT true
);

CREATE TABLE list_events (
  id integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  list_id integer REFERENCES lists ON DELETE CASCADE,
  event_type text CONSTRAINT check_list_event_type CHECK (event_type IN ('add', 'delete', 'modify')),
  user_id integer NOT NULL REFERENCES users,
  start_id integer REFERENCES list_items ON DELETE CASCADE,
  end_id integer REFERENCES list_items ON DELETE CASCADE,
  event_date timestamp with time zone DEFAULT current_timestamp
);

INSERT INTO users (email, nickname, picture) VALUES
  ('angela@email.com', 'angela', 'https://lh3.googleusercontent.com/a-/AOh14GhxdDOmsAktADJ3Y5DRp3hVuBIdLFcG-rPFdxi4tg=s96-c'),
  ('din@email.com', 'din', NULL),
  ('ryan@email.com', 'ryan', NULL),
  ('shannon@email.com', 'shannon', NULL),
  ('sully@email.com', 'sully', NULL),
  ('zach@email.com', 'zach', NULL);
