/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS company (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  image VARCHAR(255) DEFAULT NULL,
  number_of_product BIGINT NOT NULL,
  number_of_user BIGINT NOT NULL,
  percentage NUMERIC(5, 2) NOT NULL,
  user_id TEXT REFERENCES users(uid) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL
);