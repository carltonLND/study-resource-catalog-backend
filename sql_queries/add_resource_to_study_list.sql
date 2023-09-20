with study_list_item AS (
    INSERT INTO study_list (user_id, resource_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING resource_id
),
minimal_resources AS (
    SELECT resources.id, resources.title, resources.description, resources.created_at, authors.id AS author_id, authors.name AS author_name
    FROM resources
    LEFT JOIN authors ON authors.id=resources.author_id
    ORDER BY resources.id
),
user_study_list AS (
    SELECT study_list.resource_id FROM study_list WHERE user_id = $1
    union select study_list_item.resource_id from study_list_item
)
SELECT
minimal_resources.*
FROM
minimal_resources
 INNER JOIN user_study_list ON user_study_list.resource_id = minimal_resources.id
 LEFT JOIN study_list_item ON study_list_item.resource_id = minimal_resources.id;