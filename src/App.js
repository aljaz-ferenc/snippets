import Editor from './pages/Editor';
import SnippetList from './pages/SnippetList';
import { Route, Routes } from 'react-router';
import './App.css'
import Edit from './pages/Edit';
import Navigation from './components/Navigation';

function App() {

  return (
    <>
    <Navigation />
      <Routes>
        <Route path='/' element={<Editor />} />
        <Route path='/snippets' element={<SnippetList />} />
        <Route path='/edit' element={<Edit />} />
      </Routes>
    </>
  );
}
export default App;