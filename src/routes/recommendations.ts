import { Router } from "express";
import { database } from "../server";
import { DbRecommendation } from "..";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const response = await database.query<DbRecommendation>(
      "select * from recommendation_type"
    ); //.then(r => r.rows);
    const recommendations = response.rows;
    res.status(200).json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Check server logs.");
  }
});

const recommendationsRouter = router;
export default recommendationsRouter;
