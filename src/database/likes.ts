import { ResourceLike } from "..";
import { database } from "../server";

export async function getResourceLikes(resourceId: number) {
  const response = await database.fileQuery<ResourceLike>("select_likes", [
    resourceId,
  ]);
  const likes = response.rows;
  return likes;
}

export async function getResourceLikeCount(resourceId: number) {
  const response = await database.fileQuery<ResourceLike>("select_likes", [
    resourceId,
  ]);
  const likes = response.rows;
  const count = likes.length;
  return {
    count: count,
  };
}

export async function getResourceLikeCountAndIfLiked(
  resourceId: number,
  userId: number
) {
  const response = await database.fileQuery<ResourceLike>("select_likes", [
    resourceId,
  ]);
  const likes = response.rows;
  const count = likes.length;
  const liked = likes.some((like) => like.user_id === userId);
  return {
    count: count,
    isLiked: liked,
  };
}

export async function updateResourceLike(resourceId: number, user_id: number) {
  const result = await database
    .fileQuery("toggle_like", [resourceId, user_id])
    .then((r) => r.rows);
  return result;
}
