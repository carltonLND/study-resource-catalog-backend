SELECT resources.id, resources.title, resources.description, resources.created_at, authors.id AS author_id, authors.name AS author_name
    FROM resources
    LEFT JOIN authors ON authors.id=resources.author_id
    ORDER BY resources.id;