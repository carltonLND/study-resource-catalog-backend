import { Router } from "express";
import {
  addResourceToStudyList,
  getUserStudyList,
  getUsers,
  removeResourceFromStudyList,
} from "../database/users";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const user = await getUsers();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Check server logs.");
  }
});

router.get("/:user_id/study_list", async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await getUserStudyList(parseInt(user_id));
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Check server logs.");
  }
});

router.post("/:user_id/study_list/:resource_id", async (req, res) => {
  try {
    const { user_id, resource_id } = req.params;
    const resources = await addResourceToStudyList(
      parseInt(user_id),
      parseInt(resource_id)
    );
    res.status(200).json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Check server logs.");
  }
});

router.delete("/:user_id/study_list/:resource_id", async (req, res) => {
  try {
    const { user_id, resource_id } = req.params;
    const resources = await removeResourceFromStudyList(
      parseInt(user_id),
      parseInt(resource_id)
    );
    res.status(200).json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Check server logs.");
  }
});

// functionality to add users disabled but left if needed in the future
// router.post<{ name: string }>("/:name", async (req, res) => {
//   try {
//     const { name } = req.params;
//     const user = await insertUser(name);
//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred. Check server logs.");
//   }
// });

const userRouter = router;
export default userRouter;
