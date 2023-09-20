import { DbCommentWithUser, NewComment } from "..";
import { database } from "../server";

function DbComment_to_Comment({
  id,
  resource_id,
  user_id,
  user_name,
  user_is_faculty,
  content,
  created_at,
}: DbCommentWithUser) {
  return {
    id,
    resource_id,
    user: {
      id: user_id,
      name: user_name,
      is_faculty: user_is_faculty,
    },
    content,
    created_at,
  };
}

export async function getResourceComments(resourceId: string) {
  const comments = await database
    .fileQuery<DbCommentWithUser>("select_resource_comments", [resourceId])
    .then((response) => response.rows);
  return comments.map(DbComment_to_Comment);
}

export async function insertResourceComment({
  user_id,
  resource_id,
  content,
}: NewComment): Promise<DbCommentWithUser> {
  const newComment = await database
    .fileQuery("insert_comment", [user_id, resource_id, content])
    .then((response) => response.rows[0]);

  return newComment;
}
