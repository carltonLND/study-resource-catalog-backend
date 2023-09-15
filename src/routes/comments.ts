import { Router } from "express";
import { getResourceComments } from "../database/comments";
// import { database } from "../server";

const router = Router();

router.get<{ resourceId: string }>("/:resourceId", async (_req, res) => {
  const { resourceId } = _req.params;
  const comments = await getResourceComments(resourceId);
  res.status(200).json(comments);
});

const commentsRouter = router;
export default commentsRouter;
