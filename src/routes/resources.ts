import { Router } from "express";
import {
  getResourceById,
  getResourceByIdWithComments,
  getResources,
} from "../database/resources";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const resources = await getResources();
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

router.get("/full/:resourceId", async (req, res) => {
  try {
    const { resourceId } = req.params;
    const resource = await getResourceByIdWithComments(parseInt(resourceId));
    res.status(200).json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Check server logs.");
  }
});

const resourcesRouter = router;
export default resourcesRouter;
