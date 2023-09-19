WITH new_resource AS (
    INSERT INTO resources (
        title,
        author_id,
        url,
        description,
        stage_id
    )
    VALUES (
        $1, --title
        $2, --author_id
        $3, --url
        $4, --description
        $5 --stage_id
    ) RETURNING
        id,
        title,
        author_id,
        url,
        description,
        created_at,
        stage_id
), new_user_resource AS (
    INSERT INTO user_resources (
        resource_id,
        user_id
    ) VALUES (
        (SELECT id FROM new_resource),
        $6 --user_id
    ) RETURNING
        resource_id,
        user_id
), new_recommendation AS (
    INSERT INTO recommendations (
        resource_id,
        recommendation_type_id,
        content
    ) VALUES (
        (SELECT id FROM new_resource),
        $7, --recommendation_type_id
        $8 --content
    ) RETURNING
        resource_id,
        recommendation_type_id,
        content AS recommendation_content
), new_owner AS (
    SELECT
    new_user_resource.resource_id AS owner_resource_id,
    new_user_resource.user_id AS owner_id,
    users.name AS owner_name,
    users.is_faculty AS owner_is_faculty
    FROM new_user_resource
    LEFT JOIN users ON users.id=new_user_resource.user_id
) SELECT
new_resource.id AS id,
new_resource.title AS title,
new_resource.author_id AS author_id,
authors.name AS author_name,
new_resource.url AS url,
new_resource.description AS description,
new_resource.created_at AS created_at,
new_resource.stage_id AS stage_id,
cohort_stage.name AS stage_name,
new_owner.owner_id AS owner_id,
new_owner.owner_name AS owner_name,
new_owner.owner_is_faculty AS owner_is_faculty,
new_recommendation.recommendation_type_id AS recommendation_type_id,
recommendation_type.description AS recommendation_type_name,
new_recommendation.recommendation_content AS recommendation_content
FROM new_resource
LEFT JOIN new_owner ON new_owner.owner_resource_id=new_resource.id
LEFT JOIN new_recommendation ON new_recommendation.resource_id=new_resource.id
LEFT JOIN cohort_stage ON cohort_stage.id=new_resource.stage_id
LEFT JOIN authors ON authors.id=new_resource.author_id
LEFT JOIN recommendation_type ON recommendation_type.id=new_recommendation.recommendation_type_id;
