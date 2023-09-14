import { database } from "../server";
import { MinimalResource } from "./index";

export async function getResources(): Promise<MinimalResource[]> {
  const resources = await database
    .fileQuery("select_resources")
    .then((response) => response.rows);
  const tags = await database
    .fileQuery("select_resource_tags")
    .then((response) => response.rows);

  const resourcesWithTags = resources.map((resource) => {
    return {
      ...resource,
      tags: tags
        .filter((t) => resource.id === t.resource_id)
        .map((t) => t.tag_name),
    };
  });

  return resourcesWithTags;
}
