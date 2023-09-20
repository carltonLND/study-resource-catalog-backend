import { DbUser, MinimalResource } from "../index";
import { database } from "../server";

export async function getUsers(): Promise<DbUser[]> {
  const users = await database
    .query<DbUser>("SELECT * FROM users")
    .then((response) => response.rows);
  return users;
}

export async function insertUser(name: string): Promise<DbUser> {
  const users = await database
    .query<DbUser>("INSERT INTO users (name) VALUES ($1) RETURNING *", [name])
    .then((response) => response.rows[0]);
  return users;
}


export async function getUserStudyList(userId: number): Promise<MinimalResource[]> {
  const minimalResources = await database.fileQuery<MinimalResource>("select_user_study_list", [userId]).then((response) => response.rows);
  return minimalResources
}