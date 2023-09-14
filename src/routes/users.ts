import { Router } from "express";
import { database } from "../server";

const router = Router();

router.get("/users", async (_req, res) => {
  try {
    await database.query("select now()");
    res.status(200).send("system ok");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Check server logs.");
  }
});

const userRouter = router;
export default userRouter;
