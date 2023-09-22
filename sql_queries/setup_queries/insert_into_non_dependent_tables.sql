begin;

--users
INSERT INTO users (name)
VALUES
('henry'),
('carlton'),
('ana'),
('adil'),
('beth'),
('cynthia'),
('daniil'),
('ho kei'),
('julieta'),
('laura'),
('lucja'),
('oskar'),
('silviu'),
('tom'),
('tomasz'),
('viki'),
('rosie'),
('stephanie');

INSERT INTO users (name, is_faculty)
VALUES
('neill', true),
('katie', true),
('nico', true),
('lauren', true),
('Floz', true);


-- tags
INSERT INTO tags (name)
VALUES
('tool'),
('article'),
('example'),
('codebase'),
('update'),
('video');

-- authors
INSERT INTO authors (name)
VALUES
('codecademy'),
('freeCodeCamp'),
('w3schools'),
('medium'),
('geeksforgeeks');


-- cohort_stage
INSERT INTO cohort_stage (name)
VALUES
('prepare'),
('front end'),
('back end'),
('projects');

-- recommendation_type
INSERT INTO recommendation_type (description)
VALUES
('I recommend this resource after having used it'),
('I do not recommend this resource, having used it'),
('I haven''t used this resource but it looks promising');

INSERT INTO content_type (description)
VALUES
('article'),
('video'),
('book'),
('podcast'),
('course'),
('other');

commit;

rollback;
