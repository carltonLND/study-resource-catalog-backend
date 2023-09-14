SELECT resource_tags.resource_id, resource_tags.tag_id FROM resources
INNER JOIN
resource_tags ON resource_tags.resource_id=resources.id
LEFT JOIN
tags ON tags.id=resource_tags.tag_id
ORDER BY resource_tags.resource_id;