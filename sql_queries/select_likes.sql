SELECT
likes.user_id, users.name as user_name
FROM likes
INNER JOIN users ON likes.user_id = users.id
WHERE resource_id = $1
ORDER BY user_id;