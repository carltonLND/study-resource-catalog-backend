--begin;
-- resources
INSERT INTO resources (
    title,
    author_id,
    url,
    description,
    stage_id
)
VALUES
(
    'SQL Cheatsheet', --title
    1, -- author_id
    'https://www.codecademy.com/learn/learn-sql/modules/learn-sql-manipulation/cheatsheet', --url
    'a cheatsheet describing various SQL statements.', --description
    2 --stage_id
),
(
    'CSS Tables', --title
    2, -- author_id
    'https://www.w3schools.com/css/css_table.asp', --url
    'a guide to using tables in css to style your web pages', --description
    2 --stage_id
),
(
    'React useReducer Video', --title
    3, -- author_id
    'https://youtu.be/kK_Wqx3RnHk', --url
    'This YTer has some nice tutorials on React and I found his useReducer one (with the article in description) helped me get to grips with it.', --description
    3 --stage_id
),
(
    'DevTools Tips', --title
    4, -- author_id
    'https://devtoolstips.org/', --url
    'iscover helpful cross-browser DevTools tips and tricks', --description
    2 --stage_id
),
(
    'React Beautiful DnD course', --title
    5, -- author_id
    'https://www.w3schools.com/css/css_table.asp', --url
    'Drag and drop (dnd) experiences are often built to sort lists of content vertically and horizontally.', --description
    4 --stage_id
),
(
    'Writing custom hooks to tidy up React components', --title
    2, -- author_id
    'https://www.loom.com/share/40cfcab5fccf4b0f91ab19b3fb553e7b?sid=3c1caee3-8071-4564-bb5a-bdc0bf887d77', --url
    'Custom hooks in React may soun.', --description
    3 --stage_id
);
--commit;
--rollback;