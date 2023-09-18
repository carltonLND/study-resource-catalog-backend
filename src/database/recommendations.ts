import { Recommendation } from "..";
import { database } from "../server";


export async function insertRecommendation(recommendation: Recommendation, resource_id: number) {
    const response = await database.query("INSERT INTO recommendations (resource_id, recommendation_type_id, content) VALUES ($1, $2, $3) RETURNING *", [resource_id, recommendation.recommendation_type_id, recommendation.description])
    const newRecommendation = response.rows[0];
    return newRecommendation
}