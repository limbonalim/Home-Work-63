import Toolbar from '../../components/Toolbar/Toolbar.tsx';
import NewPost from '../NewPost/NewPost.tsx';
import './App.css';

const App = () => {
  return (
    <>
      <header className="MYheader">
        <Toolbar/>
      </header>
      <main className="container">
        <NewPost/>
      </main>
    </>
  );
};

export default App;
