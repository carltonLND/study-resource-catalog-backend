WITH like_status AS (
    SELECT toggle_like($1, $2) AS is_liked
), resource_likes AS (
    SELECT user_id FROM likes WHERE resource_id = $1
    UNION
    SELECT $2
    WHERE (SELECT is_liked FROM like_status) = true
    EXCEPT
    SELECT user_id FROM likes WHERE resource_id = $1 AND user_id = $2
) SELECT resource_likes.user_id, users.name
FROM resource_likes
INNER JOIN users ON resource_likes.user_id = users.id;
