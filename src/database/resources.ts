import {
  DbMinimalResource,
  DbMinimalResourceWithTags,
  FullResource,
  InsertedResource,
  MinimalResource,
  NewResource,
  Resource,
  ResourceTag,
  ResourceWithComments,
} from "..";
import { database } from "../server";
import { insertResourceTags } from "./tags";

function DbMinimalResourceWithTags_to_MinimalResource(
  DbMinimalResource: DbMinimalResourceWithTags
): MinimalResource {
  const { id, title, description, created_at, author_name, author_id, tags } =
    DbMinimalResource;
  return {
    id,
    title,
    description,
    created_at,
    author: { name: author_name, id: author_id },
    tags,
  };
}

export async function getMinimalResources(): Promise<MinimalResource[]> {
  const resources = await database
    .fileQuery<DbMinimalResource>("select_resources")
    .then((response) => response.rows);
  const tags = await database
    .fileQuery<ResourceTag>("select_resource_tags")
    .then((response) => response.rows);

  const minResourcesWithTags = resources.map((resource) => {
    const minDbResWithTag = {
      ...resource,
      tags: tags
        .filter((t) => resource.id === t.resource_id)
        .map((t) => {
          return { id: t.tag_id, name: t.tag_name };
        }),
    };
    return DbMinimalResourceWithTags_to_MinimalResource(minDbResWithTag);
  });

  return minResourcesWithTags;
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
    .then((response) => response.rows);
  console.log(resource);
  const comments = await database
    .query("SELECT * FROM comments WHERE resource_id= $1", [resourceId])
    .then((response) => response.rows);
  const resourceWithComments = { ...resource[0], comments: comments };
  return resourceWithComments;
}

function InsertedResource_to_FullResource({
  id,
  title,
  author_id,
  author_name,
  url,
  description,
  stage_id,
  stage_name,
  owner_id,
  owner_name,
  owner_is_faculty,
  tags,
  recommendation_type_id,
  recommendation_type,
  recommendation_content,
}: InsertedResource): FullResource {
  return {
    id: id,
    title: title,
    author: {
      id: author_id,
      name: author_name,
    },
    url: url,
    description: description,
    cohort_stage: {
      id: stage_id,
      name: stage_name,
    },
    owner: {
      id: owner_id,
      name: owner_name,
      is_faculty: owner_is_faculty,
    },
    recommendation: {
      recommendation_type_id: recommendation_type_id,
      recommendation_type: recommendation_type,
      content: recommendation_content,
    },
    tags: tags,
  };
}

export async function insertResource({
  title,
  author_id,
  url,
  description,
  stage_id,
  owner_id,
  recommendation_type_id,
  recommendation_content,
  tag_ids,
}: NewResource): Promise<FullResource> {
  const newResource = await database
    .fileQuery<InsertedResource>("insert_resource", [
      title,
      author_id ? author_id : null,
      url,
      description,
      stage_id ? stage_id : null,
      owner_id,
      recommendation_type_id,
      recommendation_content,
    ])
    .then((r) => r.rows[0]);
  const newResourceTags = await insertResourceTags(tag_ids, newResource.id);
  return InsertedResource_to_FullResource({
    ...newResource,
    tags: newResourceTags,
  });
}
