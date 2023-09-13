
export interface User {
    id: number;
    name: string;
    isFaculty?:  boolean;
}

export interface Recommendation {
resource_id: number;
recommendation_type: string;
content: string;
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
    title:string;
    description: string;
    created_at: string;
    author_name: string;
    tags: string[]
}


export interface Resource extends MinimalResource {
    owner: User;
    recommendation: Recommendation;
    comments: Comment[];
    likes: Like[];
}