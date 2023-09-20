/* ========================================================= DATABASE TYPES =========================================================*/
export interface DbRecommendation {
  resource_id: number;
  recommendation_type_id: number;
  content: string;
}

export interface DbRecommendationType {
  id: number;
  description: string;
}

export interface DbTag {
  id: number;
  name: string;
}

export interface DbResourceTag {
  resource_id: number;
  id: number;
  name: string;
}

export interface DbAuthor {
  id: number;
  name: string;
}

export interface DbCohortStage {
  id: number;
  name: string;
}

export interface DbUser {
  id: number;
  name: string;
  is_faculty?: boolean;
}

export interface DbComment {
  id: number;
  resource_id: number;
  user_id: number;
  content: string;
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
  tags: ResourceTag[];
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
  tag_names: string[];
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
  created_at: number;
  tags: DbTag[];
  recommendation_type_id: number;
  recommendation_type: string;
  recommendation_content: string;
}

export interface DbFullResource {
  id: number;
  title: string;
  author_id?: number;
  author_name?: string;
  url: string;
  description: string;
  created_at: number;
  stage_id?: number;
  stage_name?: string;
  owner_id: number;
  owner_name: string;
  owner_is_faculty: boolean;
  recommendation_type_id: number;
  recommendation_type: string;
  recommendation_content: string;
}

export interface FullResource {
  id: number;
  title: string;
  author: Partial<DbAuthor>;
  url: string;
  description: string;
  cohort_stage: Partial<DbCohortStage>;
  recommendation: Recommendation;
  owner: DbUser;
  created_at: number;
  tags: ResourceTag[];
}

/* ========================================================= OTHER TYPES =========================================================*/

export interface NewComment {
  resource_id: number;
  user_id: number;
  content: string;
}

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
  id: number;
  name: string;
}

export interface Recommendation {
  recommendation_type_id: number;
  recommendation_type: string;
  content: string;
}

export interface ResourceLike {
  user_id: number;
  user_name: string;
}
