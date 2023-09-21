SELECT comments.*, users.id AS user_id, users.name AS user_name, users.is_faculty AS user_is_faculty
FROM comments
INNER JOIN users ON comments.user_id=users.id
WHERE resource_id=$1;