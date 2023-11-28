import {Route, Routes} from 'react-router-dom';
import Toolbar from '../../components/Toolbar/Toolbar.tsx';
import NewPost from '../NewPost/NewPost.tsx';
import Home from '../Home/Home.tsx';
import About from '../About/About.tsx';
import Contacts from '../Contacts/Contacts.tsx';
import {ApiPost, Email, Post} from '../../types';
import './App.css';


const email: Email = {
  info: 'info@myblog.com',
  editor: 'editor@myblog.com',
  partnerships: 'partnerships@myblog.com',
};


const App = () => {
  return (
    <>
      <header className="MYheader">
        <Toolbar/>
      </header>
      <main className="container my-5">
        <Routes>
          <Route path="/" element={(
            <Home/>
          )}/>
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
