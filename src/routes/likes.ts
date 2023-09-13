import { Router } from "express";
import { listener } from "../server";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    await listener.query("select now()");
    res.status(200).send("system ok");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Check server logs.");
  }
});

const likesRouter = router;
export default likesRouter;
