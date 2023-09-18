import {
  DbResource,
  MinimalResource,
  NewResource,
  Resource,
  ResourceTag,
  ResourceWithComments,
} from "..";
import { database } from "../server";

export async function getResources(): Promise<MinimalResource[]> {
  const resources = await database
    .fileQuery<MinimalResource>("select_resources")
    .then((response) => response.rows);
  const tags = await database
    .fileQuery<ResourceTag>("select_resource_tags")
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

export async function getResourceById(resourceId: number): Promise<Resource> {
  try {
    const resource = await database.fileQuery<Resource>("select_resource", [
      resourceId,
    ]);
    return resource.rows[0];
  } catch (error) {
    console.log(error);
  }
  const resource = {} as Resource;
  return resource;
}

export async function getResourceByIdWithComments(
  resourceId: number
): Promise<ResourceWithComments> {
  const resource = await database
    .fileQuery<Resource>("select_resource", [resourceId])
    .then((response) => response.rows[0]);
  const comments = await database
    .query("SELECT * FROM comments WHERE resource_id= $1", [resourceId])
    .then((response) => response.rows);
  const resourceWithComments = { ...resource, comments: comments };
  return resourceWithComments;
}

export async function insertResource({
  title,
  url,
  description,
  stage_id /*author_id, tag_ids, owner_id, recommendation*/,
}: NewResource) {
  const newResource = await database
    .fileQuery<DbResource>("insert_resource", [
      title,
      1,
      url,
      description,
      stage_id,
    ])
    .then((r) => r.rows[0]); //TODO: Replace 1 with author_id
  return newResource;
}
