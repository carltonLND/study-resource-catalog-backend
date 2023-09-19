WITH new_resource_tags AS (
    INSERT INTO resource_tags (
    resource_id,
    tag_id
    )
    VALUES
    ***1***
    RETURNING tag_id
) SELECT tags.* FROM new_resource_tags
INNER JOIN tags ON tags.id=new_resource_tags.tag_id;
