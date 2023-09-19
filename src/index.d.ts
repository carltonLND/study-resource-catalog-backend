/* ========================================================= DATABASE TYPES =========================================================*/

export interface DbRecommendationType {
  id: number;
  description: string;
}
export interface DbRecommendation {
  resource_id: number;
  recommendation_type_id: number;
  content: string;
}

export interface DbTag {
  id: number;
  name: string;
}

export interface DbResourceTag {
  resource_id: number;
  tag_id: number;
}

export interface DbAuthor {
  id: number;
  name: string;
}

export interface DbCohortStage {
  id: number;
  name: string;
}

export interface DbUserResource {
  resource_id: number;
  user_id: number;
}

export interface DbUser {
  id: number;
  name: string;
  is_faculty?: boolean;
}

export interface DbLike {
  resource_id: number;
  user_id: number;
}

export interface DbComment {
  id: number;
  resource_id: number;
  user_id: number;
  content: string;
  created_at: number;
}

export interface DbResource {
  id: number;
  title: string;
  author_id: number;
  url: string;
  description: string;
  stage_id: string;
  created_at: number;
}

/* ========================================================= RESOURCE TYPES =========================================================*/

export interface DbMinimalResource {
  id: number;
  title: string;
  description: string;
  created_at: string;
  author_name: string;
  author_id: number;
}

export interface DbMinimalResourceWithTags extends DbMinimalResource {
  tags: DbTag[];
}

export interface MinimalResource {
  id: number;
  title: string;
  description: string;
  created_at: string;
  author: DbAuthor;
  tags: DbTag[];
}

export interface NewResource {
  title: string;
  author_id?: number;
  url: string;
  description: string;
  stage_id?: number;
  owner_id: number;
  recommendation_type_id: number;
  recommendation_content: string;
  tag_ids: number[];
}

export interface InsertedResource {
  id: number;
  title: string;
  author_id?: number;
  author_name?: string;
  url: string;
  description: string;
  stage_id?: number;
  stage_name?: string;
  owner_id: number;
  owner_name: string;
  owner_is_faculty: boolean;
  tags: DbTag[];
  recommendation_type_id: number;
  recommendation_type: string;
  recommendation_content: string;
}

export interface Resource extends MinimalResource {
  owner_name: string;
  owner_id: number;
  recommendation_type: string;
  recommendation_description: string;
}

export interface ResourceWithComments extends Resource {
  comments: DbComment[];
}

export interface ResourceWithLikes extends Resource {
  likes: Like[];
}

export interface FullResource {
  id: number;
  title: string;
  author: Partial<DbAuthor>;
  url: string;
  description: string;
  cohort_stage: Partial<DbCohortStage>;
  owner: DbUser;
  tags: DbTag[];
  recommendation: Recommendation;
}

/* ========================================================= OTHER TYPES =========================================================*/

export interface Comment {
  id: number;
  resource_id: number;
  user: DbUser;
  content: string;
  created_at: number;
}

export interface Like {
  resource_id: number;
  user_id: number;
}

export interface ResourceTag {
  resource_id: number;
  tag_id: number;
  tag_name: string;
}

export interface Recommendation {
  recommendation_type_id: number;
  recommendation_type: string;
  content: string;
}
