WITH new_comment AS (
    INSERT INTO comments (
        user_id, resource_id, content
    )
    VALUES ($1, $2, $3) RETURNING *
) SELECT new_comment.*, users.name AS user_name, users.is_faculty AS user_is_faculty
LEFT JOIN users ON users.id = new_comment.user_id;