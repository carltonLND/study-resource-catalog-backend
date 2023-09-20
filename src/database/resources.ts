import {
  DbFullResource,
  DbMinimalResource,
  DbResourceTag,
  DbTag,
  FullResource,
  InsertedResource,
  MinimalResource,
  NewResource,
  ResourceTag,
} from "..";
import { database } from "../server";
import { insertResourceTags } from "./tags";

function DbMinimalResource_to_MinimalResource(
  {
    id,
    title,
    description,
    created_at,
    author_name,
    author_id,
  }: DbMinimalResource,
  tags: DbResourceTag[]
): MinimalResource {
  return {
    id,
    title,
    description,
    created_at,
    author: { name: author_name, id: author_id },
    tags: tags
      .filter((tag) => tag.resource_id === id)
      .map((tag) => {
        return { name: tag.name, id: tag.id };
      }),
  };
}

export async function getMinimalResources(): Promise<MinimalResource[]> {
  const resources = await database
    .fileQuery<DbMinimalResource>("select_minimal_resources")
    .then((response) => response.rows);
  const tags = await database
    .fileQuery<DbResourceTag>("select_all_resource_tags")
    .then((response) => response.rows);
  const minimalResources = resources.map((resource) =>
    DbMinimalResource_to_MinimalResource(resource, tags)
  );
  return minimalResources;
}

function DbFullResource_to_FullResource(
  {
    id,
    title,
    author_id,
    author_name,
    url,
    description,
    created_at,
    stage_id,
    stage_name,
    owner_id,
    owner_name,
    owner_is_faculty,
    recommendation_type_id,
    recommendation_type,
    recommendation_content,
  }: DbFullResource,
  tags: DbTag[]
): FullResource {
  return {
    id: id,
    title: title,
    author: {
      id: author_id,
      name: author_name,
    },
    url: url,
    description: description,
    created_at: created_at,
    cohort_stage: {
      id: stage_id,
      name: stage_name,
    },
    recommendation: {
      recommendation_type_id: recommendation_type_id,
      recommendation_type: recommendation_type,
      content: recommendation_content,
    },
    owner: {
      id: owner_id,
      name: owner_name,
      is_faculty: owner_is_faculty,
    },
    tags: tags,
  };
}

export async function getResourceById(
  resourceId: number
): Promise<FullResource> {
  try {
    const resource = await database.fileQuery<DbFullResource>(
      "select_resource",
      [resourceId]
    );
    const tags = await database
      .fileQuery<ResourceTag>("select_resource_tags", [resourceId])
      .then((response) => response.rows);
    return DbFullResource_to_FullResource(resource.rows[0], tags);
  } catch (error) {
    console.log(error);
  }
  const resource = {} as FullResource;
  return resource;
}

function InsertedResource_to_FullResource({
  id,
  title,
  author_id,
  author_name,
  url,
  description,
  created_at,
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
    created_at: created_at,
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
