WITH new_tags AS (
    INSERT INTO tags (
    name
)VALUES 
    ***1***
ON CONFLICT DO NOTHING
RETURNING *
) SELECT * FROM tags
UNION
SELECT * FROM new_tags;
