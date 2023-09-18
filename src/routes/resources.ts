import { Router } from "express";
import {
  getResourceById,
  getResourceByIdWithComments,
  getResources,
  insertResource,
} from "../database/resources";
import { NewResource } from "..";
import { insertRecommendation } from "../database/recommendations";

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


router.post<NewResource>("/",async (req, res) => {
  try {
    const newResource = await insertResource(req.body);
    const newRecommendation = await insertRecommendation(req.body.recommendation, newResource.id);
    const createdResource = {...newResource, recommendation: newRecommendation};
    console.log(createdResource)
    res.status(200).json(createdResource)
  } catch (error) {
    console.log(error)
  }
})

const resourcesRouter = router;
export default resourcesRouter;
