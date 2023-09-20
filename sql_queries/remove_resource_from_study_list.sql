DELETE FROM study_list
WHERE user_id = $1 AND resource_id = $2 RETURNING * ;