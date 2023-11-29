import {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import Toolbar from '../../components/Toolbar/Toolbar';
import NewPost from '../NewPost/NewPost';
import Home from '../Home/Home';
import About from '../About/About';
import Contacts from '../Contacts/Contacts';
import MemoFullPost from '../../components/FullPost/FullPost';
import {ApiPost, Post, RoteComponent} from '../../types';
import axiosApi from '../../axios-api';
import './App.css';


const App = () => {
  const [posts, setPosts] = useState<RoteComponent[]>([]);
  const [listPosts, setListPosts] = useState<ApiPost[]>([]);
  const getPosts = async () => {
    try {
      const posts = await axiosApi.get<Post[]>('/posts.json');
      const listOfPosts: ApiPost[] = [];
      for (let post in posts.data) {
        const apiPost: ApiPost = {
          ...posts.data[post],
          id: post,
        };
        listOfPosts.push(apiPost);
      }
      getListOfPosts(listOfPosts);
      setListPosts(listOfPosts);
    } catch (error: Error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void getPosts();
  }, []);

  const getListOfPosts = (posts: ApiPost[]) => {
    const fullPostList: RoteComponent[] = posts.map((item) => {
      return {
        path: `/posts/:${item.id}`,
        component: (<MemoFullPost post={item}/>),
      };
    });
    setPosts(fullPostList);
  };

  return (
    <>
      <header className="MYheader">
        <Toolbar/>
      </header>
      <main className="container my-5">
        <Routes>
          <Route path="/" element={(
            <Home posts={listPosts}/>
          )}>
            {posts.map((item) => {
              return (<Route
                key={item.path}
                path={item.path}
                element={item.component}
              />);
            })}
          </Route>
          <Route path="/new-post" element={(
            <NewPost/>
          )}/>
          <Route path="/about" element={(
            <About/>
          )}/>
          <Route path="/contacts" element={(
            <Contacts/>
          )}/>
          <Route path="*" element={(
            <h1>Not found</h1>
          )}/>
        </Routes>

      </main>
    </>
  );
};

export default App;
