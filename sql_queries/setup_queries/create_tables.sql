
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
	name VARCHAR(255) UNIQUE
);


CREATE TABLE authors (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE cohort_stage (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL
);

CREATE TABLE recommendation_type (
	id SERIAL PRIMARY KEY,
	description VARCHAR(255) NOT NULL
);

CREATE TABLE content_type (
	id SERIAL PRIMARY KEY,
	description VARCHAR(255) NOT NULL
);


-- dependent tables


CREATE TABLE resources (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	author_id INTEGER,
	url VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
	stage_id INTEGER,
	content_type_id INTEGER,
	created_at TIMESTAMP DEFAULT timezone('utc', now()),
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,
    FOREIGN KEY (stage_id) REFERENCES cohort_stage(id) ON DELETE CASCADE,
    FOREIGN KEY (content_type_id) REFERENCES content_type(id) ON DELETE CASCADE
);


CREATE TABLE resource_tags (
	resource_id INTEGER,
	tag_id INTEGER,
    PRIMARY KEY (resource_id, tag_id),
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

CREATE TABLE recommendations (
    resource_id INTEGER PRIMARY KEY,
    recommendation_type_id INTEGER,
    content VARCHAR(255) NOT NULL ,
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
    FOREIGN KEY (recommendation_type_id) REFERENCES recommendation_type(id) ON DELETE CASCADE
);


CREATE TABLE likes (
	resource_id INTEGER,
	user_id INTEGER,
    PRIMARY KEY (resource_id, user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE
);

CREATE TABLE comments (
	id SERIAL PRIMARY KEY,
	user_id INTEGER,
	resource_id INTEGER,
	content VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT timezone('utc', now()),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE
);

CREATE TABLE user_resources (
	resource_id INTEGER,
	user_id INTEGER,
	PRIMARY KEY (resource_id, user_id),
	FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE study_list (
	user_id INTEGER,
	resource_id INTEGER,
	PRIMARY KEY (user_id, resource_id),
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE
);
