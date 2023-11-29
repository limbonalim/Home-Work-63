import {useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import Toolbar from '../../components/Toolbar/Toolbar.tsx';
import NewPost from '../NewPost/NewPost.tsx';
import Home from '../Home/Home.tsx';
import About from '../About/About.tsx';
import Contacts from '../Contacts/Contacts.tsx';
import FullPost from '../../components/FullPost/FullPost.tsx';
import {ApiPost, RoteComponent} from '../../types';
import './App.css';


const App = () => {
  const [posts, setPosts] = useState<RoteComponent[]>([]);

  const getListOfPosts = (posts: ApiPost[]) => {
    const fullPostList: RoteComponent[] = posts.map((item) => {
      return {
        path: `/posts/:${item.id}`,
        component: (<FullPost post={item}/>),
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
            <Home getListOfPosts={getListOfPosts}/>
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
