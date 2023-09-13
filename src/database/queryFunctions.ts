import dbClient from "./dbSetup";
import { MinimalResource } from "./types";

export async function getResources(): Promise<MinimalResource[]> {
  const resources = await dbClient
    .fileQuery("select_resource", [1])
    .then((response) => response.rows);
  const tags = await dbClient
    .fileQuery("select_resource_tags")
    .then((response) => response.rows);

  const resourcesWithTags = resources.map((resource) => {
    return { ...resource, tag: tags.filter((t) => resource.id === t[0]) };
  });

  return resourcesWithTags;
}
