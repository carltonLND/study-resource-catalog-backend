import { DbComment, NewComment } from "..";
import { database } from "../server";

export async function getResourceComments(resourceId: string) {
  const comments = await database
    .query("SELECT * FROM comments WHERE resource_id= $1", [resourceId])
    .then((response) => response.rows);
  return comments;
}

export async function insertResourceComment(
  comment: NewComment
): Promise<DbComment> {
  const newComment = await database
    .query(
      "INSERT INTO comments (user_id, resource_id, content) VALUES ($1, $2, $3) RETURNING *",
      [comment.user_id, comment.resource_id, comment.content]
    )
    .then((response) => response.rows[0]);

  return newComment;
}
