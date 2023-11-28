import Toolbar from '../../components/Toolbar/Toolbar.tsx';
import NewPost from '../NewPost/NewPost.tsx';
import Home from '../Home/Home.tsx';
import './App.css';
import {Route, Routes} from 'react-router-dom';

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
          <Route path="*" element={(
            <h1>Not found</h1>
          )}/>
        </Routes>

      </main>
    </>
  );
};

export default App;
