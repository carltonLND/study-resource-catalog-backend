import { Router } from "express";
import { DbComment, FullResource, NewComment, NewResource } from "..";
import {
  getResourceComments,
  insertResourceComment,
} from "../database/comments";
import {
  getResourceLikeCount,
  getResourceLikeCountAndIfLiked,
  getResourceLikes,
  updateResourceLike,
} from "../database/likes";
import {
  getMinimalResources,
  getResourceById,
  insertResource,
} from "../database/resources";
import { createResourceEmbed, sendNotification } from "../discord";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const resources = await getMinimalResources();
    res.status(200).json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Check server logs.");
  }
});

router.get("/:resourceId", async (req, res) => {
  try {
    const { resourceId } = req.params;
    const resource = await getResourceById(parseInt(resourceId));
    res.status(200).json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Check server logs.");
  }
});

router.post<Record<string, never>, FullResource, NewResource>(
  "/",
  async (req, res) => {
    try {
      const newResource = await insertResource(req.body);
      res.status(201).json(newResource);

      const embed = createResourceEmbed(newResource);
      sendNotification(embed);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get<{ resourceId: string }>("/:resourceId/likes", async (_req, res) => {
  try {
    const { resourceId } = _req.params;
    const likes = await getResourceLikes(parseInt(resourceId));
    res.status(200).json(likes);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Check server logs.");
  }
});

router.get<{ resourceId: string }>(
  "/:resourceId/comments",
  async (req, res) => {
    try {
      const { resourceId } = req.params;
      const comments = await getResourceComments(resourceId);
      res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred. Check server logs.");
    }
  }
);

router.post<Record<string, never>, DbComment | string, NewComment>(
  "/:resourceId/comments",
  async (req, res) => {
    try {
      const newComment = await insertResourceComment(req.body);
      res.status(201).json(newComment);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred. Check server logs.");
    }
  }
);

router.get<{ resourceId: string }>(
  "/:resourceId/likes/count",
  async (req, res) => {
    try {
      const { resourceId } = req.params;
      const likes = await getResourceLikeCount(parseInt(resourceId));
      res.status(200).json(likes);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred. Check server logs.");
    }
  }
);

router.get<{ resourceId: string; userId: string }>(
  "/:resourceId/likes/count/:userId",
  async (req, res) => {
    try {
      const { resourceId, userId } = req.params;
      const likesWithUser = await getResourceLikeCountAndIfLiked(
        parseInt(resourceId),
        parseInt(userId)
      );
      res.status(200).json(likesWithUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred. Check server logs.");
    }
  }
);

router.patch<{ resource_id: string; user_id: string }>(
  "/:resource_id/likes/:user_id",
  async (req, res) => {
    try {
      const { resource_id, user_id } = req.params;
      const result = await updateResourceLike(
        parseInt(resource_id),
        parseInt(user_id)
      );
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred. Check server logs.");
    }
  }
);

const resourcesRouter = router;
export default resourcesRouter;
