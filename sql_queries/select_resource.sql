WITH resource AS ( -- get the whole resource
    SELECT resources.*, authors.name as author, cohort_stage.name AS stage FROM resources
    LEFT JOIN authors ON authors.id=resources.author_id
    LEFT JOIN cohort_stage ON cohort_stage.id=resources.stage_id
    WHERE resources.id=$1
),
owner AS ( --get the owner of the resource
    SELECT users.id AS owner_id, users.name AS owner_name, user_resources.resource_id FROM users
    INNER JOIN user_resources ON user_resources.user_id=users.id
    WHERE user_resources.resource_id=$1
),
recommendation AS ( --get the recommendation of the resource
    SELECT recommendation_type.description AS recommendation_type, recommendations.content AS recommendation_content FROM recommendations
    INNER JOIN recommendation_type ON recommendation_type.id=recommendations.recommendation_type_id
    WHERE recommendations.resource_id=$1
) SELECT * FROM resource, owner, recommendation;



