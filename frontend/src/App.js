import {
  HashRouter as Router,
  Routes, // Import Routes from react-router-dom
  Route
} from "react-router-dom";

import './App.css';
import Header from './components/Header_f';
import NotesListPage from './pages/NotesListPage';
import NotePage from './pages/NotePage'
function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
        <Header/>
        {/* Use Routes to wrap Route */}
        <Routes>
          <Route path="/" exact Component={NotesListPage} />
          <Route path="/note/:id" Component={NotePage} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
