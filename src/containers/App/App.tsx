import {useCallback, useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import Toolbar from '../../components/Toolbar/Toolbar';
import NewPost from '../NewPost/NewPost';
import Home from '../Home/Home';
import About from '../About/About';
import Contacts from '../Contacts/Contacts';
import MemoFullPost from '../../components/FullPost/FullPost';
import {ApiPost, Post, RoteComponent} from '../../types';
import axiosApi from '../../axios-api';
import './App.css';
import Loading from '../../components/Loading/Loading';


const App = () => {
  const [posts, setPosts] = useState<RoteComponent[]>([]);
  const [listPosts, setListPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getPosts = useCallback(async () => {
    try {
      setLoading(true);
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
      getError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void getPosts();
  }, [getPosts]);

  const getError = (message: string) => {
    setShowAlert(true);
    setError(message);
  };

  const getListOfPosts = (posts: ApiPost[]) => {
    const fullPostList: RoteComponent[] = posts.map((item) => {
      return {
        path: `/posts/:${item.id}`,
        component: (<MemoFullPost post={item} onChange={getPosts}/>),
      };
    });
    setPosts(fullPostList);
  };

  return (
    <>
      <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          {error}
        </p>
      </Alert>
      <header className="MYheader">
        <Toolbar/>
      </header>
      {loading ? <Loading/> :
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
                  />
                );
              })}
            </Route>
            <Route path="/new-post" element={(
              <NewPost onChange={getPosts} getError={getError}/>
            )}/>
            <Route path="/posts/:id/edit" element={(
              <NewPost onChange={getPosts} title="Edit Post!" getError={getError}/>
            )}/>
            <Route path="/about" element={(
              <About getError={getError}/>
            )}/>
            <Route path="/contacts" element={(
              <Contacts url="/email.json" getError={getError}/>
            )}/>
            <Route path="*" element={(
              <h1>Not found</h1>
            )}/>
          </Routes>
        </main>}
    </>
  );
};

export default App;
