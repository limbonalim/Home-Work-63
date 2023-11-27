export interface FormPost {
  title: string;
  description: string;
}

export interface Post extends FormPost {
  dateTime: string;
}

export interface ApiPost extends Post {
  id: string;
}