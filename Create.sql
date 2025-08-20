CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('STUDENT', 'TEACHER')),
    attempt BOOLEAN
);
CREATE TABLE quiz_questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    opta TEXT NOT NULL,
    optb TEXT NOT NULL,
    optc TEXT NOT NULL,
    optd TEXT NOT NULL,
    answer CHAR(1) NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D'))
);
CREATE TABLE results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
