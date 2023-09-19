WITH resource AS ( -- get the whole resource
    SELECT
    resources.id AS resource_id,
    resources.title AS resource_title,
    resources.url AS resource_url,
    resources.description AS resource_description,
    resources.created_at AS resource_created_at,
    authors.id AS resource_author_id,
    authors.name AS resource_author_name,
    cohort_stage.id AS resource_stage_id,
    cohort_stage.name AS resource_stage_name
    FROM resources
    LEFT JOIN authors ON authors.id=resources.author_id
    LEFT JOIN cohort_stage ON cohort_stage.id=resources.stage_id
    WHERE resources.id=$1
),
owner AS ( --get the owner of the resource
    SELECT users.id AS owner_id,
    users.name AS owner_name,
    user_resources.resource_id as owner_resource_id
    FROM users
    INNER JOIN user_resources ON user_resources.user_id=users.id
    WHERE user_resources.resource_id=$1
),
recommendation AS ( --get the recommendation of the resource
    SELECT recommendations.resource_id as recommendation_resource_id,
    recommendation_type.description AS recommendation_type,
    recommendations.content AS recommendation_content
    FROM recommendations
    INNER JOIN recommendation_type ON recommendation_type.id=recommendations.recommendation_type_id
    WHERE recommendations.resource_id=$1
) SELECT 
    resource.resource_id as id,
    resource.resource_title as title,
    resource.resource_author_id as author_id,
    resource.resource_author_name as author_name,
    resource.resource_url as url,
    resource.resource_description as description,
    resource.resource_stage_name as stage_name,
    resource.resource_stage_id as stage_id,
    resource.resource_created_at as resource_created_at,
    owner.owner_id as owner_id,
    owner.owner_name as owner_name,
    recommendation.recommendation_type as recommendation_type,
    recommendation.recommendation_content as recommendation_content
    FROM resource
left join owner on owner.owner_resource_id=resource.resource_id
left join recommendation on recommendation.recommendation_resource_id=resource.resource_id;