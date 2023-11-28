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

export interface Email {
  info: string;
  editor: string;
  partnerships: string;
}