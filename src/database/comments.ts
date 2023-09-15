import { database } from "../server";

export async function getResourceComments(resourceId: string) {
  const comments = await database
    .query("SELECT * FROM comments WHERE resource_id= $1", [resourceId])
    .then((response) => response.rows);
  return comments;
}
