import { DbComment, NewComment } from "..";
import { database } from "../server";


function DbComment_to_Comment({id, resource_id, user_id, user_name, user_is_faculty, content, created_at}: DbComment) {
  return {
    id,
    resource_id,
    user: {
      id: user_id,
      name: user_name,
      is_faculty: user_is_faculty
    },
    content,
    created_at,
  };
}




export async function getResourceComments(resourceId: string) {
  const comments = await database
    .fileQuery<DbComment>("select_resource_comments", [resourceId])
    .then((response) => response.rows);
  return comments.map(DbComment_to_Comment);
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
