SELECT resources.id, resources.title, resources.description, resources.created_at, authors.id AS author_id, authors.name AS author_name
    FROM resources
    LEFT JOIN authors ON authors.id=resources.author_id
    ORDER BY resources.id;
    
WITH minimal_resources AS (
    SELECT resources.id, resources.title, resources.description, resources.created_at, authors.id AS author_id, authors.name AS author_name
    FROM resources
    LEFT JOIN authors ON authors.id=resources.author_id
    ORDER BY resources.id
) SELECT
minimal_resources.*
FROM
minimal_resources
INNER JOIN study_list ON study_list.resource_id = minimal_resources.id
WHERE study_list.user_id = $1;