
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS user_resources;
DROP TABLE IF EXISTS resource_tags;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS recommendation;
DROP TABLE IF EXISTS recommendation_type;
DROP TABLE IF EXISTS resources;
DROP TABLE IF EXISTS cohort_stage;
DROP TABLE IF EXISTS authors;


-- non-dependent tables
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	is_faculty BOOLEAN DEFAULT false
);

CREATE TABLE tags (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255)
);


CREATE TABLE authors (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) unique NOT NULL
);

CREATE TABLE cohort_stage (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL
);

CREATE TABLE recommendation_type (
	id SERIAL PRIMARY KEY,
	description VARCHAR(255) NOT NULL
);


-- dependent tables


CREATE TABLE resources (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	author_id SERIAL NOT NULL,
	url VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
	stage_id SERIAL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,
    FOREIGN KEY (stage_id) REFERENCES cohort_stage(id)
);


CREATE TABLE resource_tags (
	resource_id SERIAL,
	tag_id SERIAL,
    PRIMARY KEY (resource_id, tag_id),
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

CREATE TABLE recommendations (
    resource_id SERIAL PRIMARY KEY,
    recommendation_type_id SERIAL,
    content VARCHAR(255) NOT NULL ,
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
    FOREIGN KEY (recommendation_type_id) REFERENCES recommendation_type(id) ON DELETE CASCADE
);


CREATE TABLE likes (
	resource_id SERIAL,
	user_id SERIAL,
    PRIMARY KEY (resource_id, user_id),
    FOREIGN KEY (resource_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES resources(id) ON DELETE CASCADE
);

CREATE TABLE comments (
	id SERIAL PRIMARY KEY,
	user_id SERIAL,
	resource_id SERIAL,
	content VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE
);

CREATE TABLE user_resources (
	resource_id SERIAL,
	user_id SERIAL,
	PRIMARY KEY (resource_id, user_id),
	FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)