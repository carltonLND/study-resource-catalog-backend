import { Router } from "express";
import { database } from "../server";
import { getResources, getTags } from "../database/queryFunctions";

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

router.get("/:resourceId", async (_req, res) => {
  try {
    await database.query("select now()");
    res.status(200).send("system ok");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Check server logs.");
  }
});


router.get("/tags", async (_req, res) => {
  try {
    const tags = await getTags();
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Check server logs.");
  }})


const resourcesRouter = router;
export default resourcesRouter;


