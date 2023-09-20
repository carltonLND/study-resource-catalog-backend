import { Router } from "express";
import {
  getMinimalResources,
  getResourceById,
  insertResource,
} from "../database/resources";
import { FullResource, NewResource } from "..";
import {
  getResourceLikeCount,
  getResourceLikeCountAndIfLiked,
  getResourceLikes,
} from "../database/likes";
import { getResourceComments } from "../database/comments";

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
      res.status(200).json(newResource);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get<{ resourceId: string }>("/:resourceId/likes", async (_req, res) => {
  const { resourceId } = _req.params;
  const comments = await getResourceLikes(parseInt(resourceId));
  res.status(200).json(comments);
});

router.get<{ resourceId: string }>(
  "/:resourceId/comments",
  async (_req, res) => {
    const { resourceId } = _req.params;
    const comments = await getResourceComments(resourceId);
    res.status(200).json(comments);
  }
);

router.get<{ resourceId: string; userId: string }>(
  "/:resourceId/likes/count",
  async (_req, res) => {
    const { resourceId } = _req.params;
    const comments = await getResourceLikeCount(parseInt(resourceId));
    res.status(200).json(comments);
  }
);

router.get<{ resourceId: string; userId: string }>(
  "/:resourceId/likes/count/:userId",
  async (_req, res) => {
    const { resourceId, userId } = _req.params;
    const comments = await getResourceLikeCountAndIfLiked(
      parseInt(resourceId),
      parseInt(userId)
    );
    res.status(200).json(comments);
  }
);

const resourcesRouter = router;
export default resourcesRouter;
