SELECT tags.id, tags.name FROM resources
INNER JOIN
resource_tags ON resource_tags.resource_id=resources.id
LEFT JOIN
tags ON tags.id=resource_tags.tag_id
WHERE resource_tags.resource_id=$1
ORDER BY resource_tags.resource_id;