import { Router } from "express";
import { getResources } from "../database/resources";

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

// router.get("/full/:resourceId", async (_req, res) => {
//   try {
//     await database.query("select now()");
//     res.status(200).send("system ok");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred. Check server logs.");
//   }
// });

const resourcesRouter = router;
export default resourcesRouter;
