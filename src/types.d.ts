import React from 'react';

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

export interface RoteComponent {
  path: string;
  component: React.ReactNode;
}

export interface Email {
  info: string;
  editor: string;
  partnerships: string;
}