INSERT INTO recommendations
(resource_id, recommendation_type_id, content)
VALUES
($1, $2, $3);

SELECT recommendations.content, recommendation_type.description FROM recommendations INNER JOIN recommendation_type ON recommendations.recommendation_type_id=recommendation_type.id
WHERE recommendations.resource_id=$1;