import { Router } from "express";
import { database } from "../server";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const response =
      await database.query(`SELECT resources.id, resources.title, resources.description, resources.created_at, authors.name as author_name
    FROM resources
    left join authors on authors.id=resources.author_id`);
    const resources = response.rows;
    const tags = (await database.query("SELECT name FROM tags")).rows;
    const resourcesWithTags = resources.map((resource) => {
      const retResource = {
        ...resource,
        tags: [
          tags[Math.floor(Math.random() * tags.length)].name,
          tags[Math.floor(Math.random() * tags.length)].name,
          tags[Math.floor(Math.random() * tags.length)].name,
        ],
      };
      return retResource;
    });
    res.status(200).json(resourcesWithTags);
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

const resourcesRouter = router;
export default resourcesRouter;
