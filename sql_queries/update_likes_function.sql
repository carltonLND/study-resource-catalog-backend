drop function if exists toggle_like(NUMERIC, NUMERIC);

CREATE OR REPLACE FUNCTION toggle_like(
    rid NUMERIC, 
    uid NUMERIC
) 
RETURNS boolean AS $$
DECLARE
    row_exists NUMERIC;
BEGIN

    SELECT 1 
    INTO row_exists 
    FROM likes 
    WHERE resource_id = rid and user_id = uid;

    IF (row_exists > 0) THEN
        DELETE FROM likes WHERE resource_id = rid and user_id = uid;
        RETURN false;
    ELSE
        INSERT INTO likes(resource_id, user_id) VALUES(rid, uid);
        RETURN true;
    END IF;

END; 
$$
LANGUAGE plpgsql;

select toggle_like($1, $2);