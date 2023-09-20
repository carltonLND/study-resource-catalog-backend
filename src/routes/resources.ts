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
} from "../database/likes";
import {
  getMinimalResources,
  getResourceById,
  insertResource,
} from "../database/resources";

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
    } catch (error) {
      console.log(error);
    }
  }
);

router.get<{ resourceId: string }>("/:resourceId/likes", async (_req, res) => {
  const { resourceId } = _req.params;
  const likes = await getResourceLikes(parseInt(resourceId));
  res.status(200).json(likes);
});

router.get<{ resourceId: string }>(
  "/:resourceId/comments",
  async (req, res) => {
    const { resourceId } = req.params;
    const comments = await getResourceComments(resourceId);
    res.status(200).json(comments);
  }
);

router.post<Record<string, never>, DbComment, NewComment>(
  "/:resourceId/comments",
  async (req, res) => {
    const newComment = await insertResourceComment(req.body);
    res.status(201).json(newComment);
  }
);

router.get<{ resourceId: string }>(
  "/:resourceId/likes/count",
  async (req, res) => {
    const { resourceId } = req.params;
    const likes = await getResourceLikeCount(parseInt(resourceId));
    res.status(200).json(likes);
  }
);

router.get<{ resourceId: string; userId: string }>(
  "/:resourceId/likes/count/:userId",
  async (req, res) => {
    const { resourceId, userId } = req.params;
    const likesWithUser = await getResourceLikeCountAndIfLiked(
      parseInt(resourceId),
      parseInt(userId)
    );
    res.status(200).json(likesWithUser);
  }
);

const resourcesRouter = router;
export default resourcesRouter;
