
import { DbTag } from "../index";
import { database } from "../server";



export async function getTags(): Promise<DbTag[]> {
  const tags = await database
    .fileQuery("SELECT * FROM tags")
    .then((response) => response.rows) as DbTag[];
  return tags;
}

