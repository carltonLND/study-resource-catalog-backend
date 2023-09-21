CREATE OR REPLACE FUNCTION toggle_like(r_id INTEGER, u_id INTEGER)
RETURNS TABLE (
    isLiked BOOLEAN
)
LANGUAGE plpgsql
AS
$$
DECLARE
    row_exists NUMERIC;
BEGIN
    SELECT COUNT(*)
    INTO row_exists 
    FROM likes 
    WHERE likes.resource_id = r_id AND likes.user_id = u_id;
    IF (row_exists > 0) THEN
        DELETE FROM likes WHERE likes.resource_id = r_id AND likes.user_id = u_id;
        RETURN false;
    ELSE
        INSERT INTO likes (resource_id, user_id) VALUES(r_id, u_id);
        RETURN true;
    END IF;

END;
$$

SELECT * FROM toggle_like($1, $2) AS result(resource_id INTEGER, user_id INTEGER, isLiked BOOLEAN);