import { Router } from "express";
import { getUserStudyList, getUsers, insertUser } from "../database/users";

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


router.get("/study_list/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await getUserStudyList(parseInt(user_id));
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Check server logs.");
  }
})

router.post<{ name: string }>("/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const user = await insertUser(name);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Check server logs.");
  }
});

const userRouter = router;
export default userRouter;
