SELECT resource_tags.resource_id, resource_tags.tag_id FROM resources
inner JOIN
resource_tags on resource_tags.resource_id=resources.id
left join
tags on tags.id=resource_tags.tag_id
order by resource_tags.resource_id;