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
  const allTags = await database
    .dynamicQuery<DbTag>("insert_tags", tag_names, ["$$"], tag_names.length, 0)
    .then((result) => result.rows);

  const matchingTags = allTags.filter((tag) => tag_names.includes(tag.name));

  const newResourceTags = await database
    .dynamicQuery(
      "insert_resource_tags",
      [resource_id, ...matchingTags.map((tag) => tag.id)],
      ["$1", "$$"],
      matchingTags.length,
      1
    )
    .then((response) => response.rows);

  return newResourceTags;
}
