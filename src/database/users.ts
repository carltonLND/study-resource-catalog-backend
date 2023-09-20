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

export async function getUserStudyList(
  userId: number
): Promise<MinimalResource[]> {
  const minimalResources = await database
    .fileQuery<MinimalResource>("select_user_study_list", [userId])
    .then((response) => response.rows);
  return minimalResources;
}

export async function addResourceToStudyList(
  userId: number,
  resourceId: number
) {
  const minimalResources = await database
    .fileQuery<MinimalResource>("add_resource_to_study_list", [
      userId,
      resourceId,
    ])
    .then((response) => response.rows);
  return minimalResources;
}

export async function removeResourceFromStudyList(
  userId: number,
  resourceId: number
) {
  const minimalResources = await database
    .fileQuery<MinimalResource>("remove_resource_from_study_list", [
      userId,
      resourceId,
    ])
    .then((response) => response.rows);
  return minimalResources;
}

// export async function functionNameHere(param1: Type): Type {
//   const minimalResources = await database.fileQuery<MinimalResource>("filename", [values]).then((response) => response.rows);
//   return minimalResources
// }
