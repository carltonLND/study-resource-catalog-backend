import { Router } from "express";
import { getTags } from "../database/tags";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const tags = await getTags();
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Check server logs.");
  }
});

const tagsRouter = router;
export default tagsRouter;
