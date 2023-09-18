export interface DbUser {
  id: number;
  name: string;
  isFaculty?: boolean;
}

export interface Comment {
  id: number;
  resource_id: number;
  user_id: number;
  content: string;
  created_at: string;
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

export interface DbTag {
  id: number;
  name: string;
}

export interface MinimalResource {
  id: number;
  title: string;
  description: string;
  created_at: string;
  author_name: string;
  author_id: number;
  tags: DbTag[];
}

export interface Resource extends MinimalResource {
  owner_name: string;
  owner_id: number;
  recommendation_type: string;
  recommendation_content: string;
}

export interface ResourceWithComments extends Resource {
  comments: Comment[];
}

export interface ResourceWithLikes extends Resource {
  likes: Like[];
}

export type FullResource = ResourceWithComments & ResourceWithLikes;

export interface DbRecommendation {
  id: string;
  description: string;
}

export interface Recommendation {
  recommendation_type_id: number;
  description: string;
}

export interface NewResource {
  title: string;
  author_id?: number;
  url: string;
  description: string;
  stage_id?: number;
  tag_ids: number[];
  owner_id: number;
  recommendation: Recommendation;
}
