CREATE TABLE users(
    userid VARCHAR(6) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    discord_id VARCHAR(20) UNIQUE,
    email_verified BOOLEAN NOT NULL,
    discord_verified BOOLEAN NOT NULL,
    permission_level NUMBER NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY(userid)
);

CREATE TABLE movies(
    imdb_id VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    released TEXT NOT NULL,
    plot TEXT NOT NULL,
    poster_url VARCHAR(255) NOT NULL,
    metascore_rating VARCHAR(3) NOT NULL,
    imdb_rating VARCHAR(4) NOT NULL,
    rotten_tomatoes_rating VARCHAR(4) NOT NULL,
    future_movie BOOLEAN NOT NULL,
    added_by VARCHAR(6) NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY(added_by) REFERENCES users(userid) ON DELETE NO ACTION,
    PRIMARY KEY(imdb_id)
);

CREATE TABLE genres(
    imdb_id VARCHAR(50) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    FOREIGN KEY(imdb_id) REFERENCES movies(imdb_id) ON DELETE CASCADE,
    PRIMARY KEY(imdb_id,genre)
);

CREATE TABLE ratings(
    userid VARCHAR(6) NOT NULL,
    imdb_id VARCHAR(50) NOT NULL,
    source VARCHAR(7) NOT NULL,
    ranking INTEGER NOT NULL,
    overall DECIMAL(2,1),
    acting DECIMAL(2,1),
    cinematography DECIMAL(2,1),
    concept DECIMAL(2,1),
    execution DECIMAL(2,1),
    experience DECIMAL(2,1),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY(userid) REFERENCES users(userid) ON DELETE CASCADE,
    FOREIGN KEY(imdb_id) REFERENCES movies(imdb_id) ON DELETE CASCADE,
    PRIMARY KEY(userid, imdb_id)
);