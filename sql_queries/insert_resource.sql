INSERT INTO resources (
    title,
    author_id,
    url,
    description,
    stage_id
)
VALUES (
    $1,
    $2,
    $3,
    $4,
    $5
);