import { MinimalResource, ResourceTag } from "..";
import { database } from "../server";

export async function getResources(): Promise<MinimalResource[]> {
    const resources = await database
      .fileQuery<MinimalResource, undefined>("select_resources")
      .then((response) => response.rows);
    const tags = await database
      .fileQuery<ResourceTag, undefined>("select_resource_tags")
      .then((response) => response.rows);
  
    const resourcesWithTags = resources.map((resource) => {
      return {
        ...resource,
        tags: tags
          .filter((t) => resource.id === t.resource_id)
          .map((t) => {
            return { id: t.tag_id, name: t.tag_name };
          }),
      };
    });
  
    return resourcesWithTags;
  }