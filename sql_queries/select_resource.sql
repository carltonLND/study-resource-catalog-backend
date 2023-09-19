WITH resource AS ( -- get the whole resource
    SELECT resources.*, authors.name as author, cohort_stage.name AS stage FROM resources
    LEFT JOIN authors ON authors.id=resources.author_id
    LEFT JOIN cohort_stage ON cohort_stage.id=resources.stage_id
    WHERE resources.id=$1
),
owner AS ( --get the owner of the resource
    SELECT users.id AS owner_id,
    users.name AS owner_name,
    user_resources.resource_id AS owner_resource_id
    FROM users
    INNER JOIN user_resources ON user_resources.user_id=users.id
    WHERE user_resources.resource_id=$1
),
recommendation AS ( --get the recommendation of the resource
    SELECT recommendations.resource_id AS recommendation_resource_id,
    recommendation_type.description AS recommendation_type,
    recommendations.content AS recommendation_content
    FROM recommendations
    INNER JOIN recommendation_type ON recommendation_type.id=recommendations.recommendation_type_id
    WHERE recommendations.resource_id=$1
) SELECT 
    resource.resource_id AS id,
    resource.resource_title AS title,
    resource.resource_author_id AS author_id,
    resource.resource_author_name AS author_name,
    resource.resource_url AS url,
    resource.resource_description AS description,
    resource.resource_stage_name AS stage_name,
    resource.resource_stage_id AS stage_id,
    resource.resource_created_at AS resource_created_at,
    owner.owner_id AS owner_id,
    owner.owner_name AS owner_name,
    recommendation.recommendation_type AS recommendation_type,do 
    recommendation.recommendation_content AS recommendation_content
    FROM resource
LEFT JOIN OWNER ON owner.owner_resource_id=resource.resource_id
LEFT JOIN recommendation ON recommendation.recommendation_resource_id=resource.resource_id;
