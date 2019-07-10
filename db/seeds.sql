USE 'purrfect_match_DB';

CREATE TABLE 'users' (
    id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    favorites VARCHAR(255) NULL,
    preferences VARCHAR(255) NULL,
    has_preferences BOOLEAN DEFAULT 'false',
    PRIMARY KEY (id)
);

-- We can enter test data in here to simulate user accounts