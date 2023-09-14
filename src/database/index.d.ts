export interface User {
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

export interface MinimalResource {
  id: number;
  title: string;
  description: string;
  created_at: string;
  author_name: string;
  tags: DbTag[];
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

export interface Resource extends MinimalResource {
  owner: User;
  recommendation: Recommendation;
  comments: Comment[];
  likes: Like[];
}

export interface Recommendation {
  resource_id: number;
  recommendation_type_id: number;
  content: string;
}

export interface NewResource {
  title: string;
  author_id?: number;
  url: string;
  description: string;
  stage_id?: number;
  tag_ids: number[];
  owner: User;
  recommendation: Recommendation;
}
