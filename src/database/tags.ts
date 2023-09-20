import { DbTag } from "../index";
import { database } from "../server";

export async function getTags(): Promise<DbTag[]> {
  const tags = (await database
    .query("SELECT * FROM tags")
    .then((response) => response.rows)) as DbTag[];
  return tags;
}

export async function insertResourceTags(
  tag_names: string[],
  resource_id: number
): Promise<DbTag[]> {
  await database.dynamicQuery<DbTag>(
    "insert_tags",
    tag_names,
    ["$$"],
    tag_names.length,
    0
  );
  const response = await database.dynamicQuery(
    "insert_resource_tags",
    [resource_id, ...tag_names],
    ["$1", "$$"],
    tag_names.length,
    1
  );
  const newResourceTags = response.rows;
  return newResourceTags;
}
