
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	is_faculty boolean default false NOT NULL,
)

CREATE TABLE resources (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	author INTEGER REFERENCES authors(id) NOT NULL,
	url INTEGER NOT NULL,
	description INTEGER NOT NULL,
	tags INTEGER REFERENCES resource_types(id) NOT NULL,
	stage INTEGER REFERENCES cohort_stage(id) NOT NULL,
	creation_time DATE NOT NULL,
	owner INTEGER REFERENCES users(id) NOT NULL,
	recommendation VARCHAR REFERENCES recommendation_type(id) NOT NULL,
	reason INTEGER NOT NULL,
)

CREATE TABLE authors (
	id SERIAL PRIMARY KEY,
	name INTEGER unique NOT NULL,
)

CREATE TABLE cohort_stage (
	id SERIAL PRIMARY KEY,
	name INTEGER NOT NULL,
	description INTEGER NOT NULL,
)

CREATE TABLE tags (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
)

CREATE TABLE likes (
	resource_id SERIAL PRIMARY KEY REFERENCES users(id),
	user_id INTEGER PRIMARY KEY REFERENCES resources(id),
)

CREATE TABLE comments (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id) NOT NULL,
	resource_id INTEGER REFERENCES resources(id) NOT NULL,
	content VARCHAR NOT NULL,
	created_at timestamp NOT NULL,
)

CREATE TABLE resource_tags (
	resource_id SERIAL PRIMARY KEY REFERENCES resources(id),
	tag_id INTEGER PRIMARY KEY REFERENCES tags(id),
)

CREATE TABLE recommendation_type (
	id SERIAL PRIMARY KEY,
	description INTEGER,
)

