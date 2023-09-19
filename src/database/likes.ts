import { ResourceLike } from "..";
import { database } from "../server";

export async function getResourceLikes(resourceId: number) {
  const response = await database.fileQuery<ResourceLike>("select_likes", [
    resourceId,
  ]);
  const likes = response.rows;
  console.log(likes);
  return likes;
}
