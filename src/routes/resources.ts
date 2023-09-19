import { Router } from "express";
import {
  getMinimalResources,
  getResourceById,
  getResourceByIdWithComments,
  insertResource,
} from "../database/resources";
import { FullResource, NewResource } from "..";

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

router.post<"/", "", FullResource, NewResource>("/", async (req, res) => {
  try {
    const newResource = await insertResource(req.body);
    res.status(200).json(newResource);
  } catch (error) {
    console.log(error);
  }
});

const resourcesRouter = router;
export default resourcesRouter;
