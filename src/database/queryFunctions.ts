import { database } from "../server";
import { MinimalResource } from "./types";

export async function getResources(): Promise<MinimalResource[]> {
  const resources = await database
    .fileQuery("select_resources")
    .then((response) => response.rows);
  const tags = await database
    .fileQuery("select_resource_tags")
    .then((response) => response.rows);

  const resourcesWithTags = resources.map((resource) => {
    return { ...resource, tag: tags.filter((t) => resource.id === t[0]) };
  });

  return resourcesWithTags;
}
