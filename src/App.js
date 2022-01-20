import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
function App() {
  return (
    <>
    <NoteState>
         <Router>
         <div className='cotainer'>
      <Navbar />
      <Alert message="Amazingly Done"/>
        

    <Routes>
    
      <Route exact path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      {/* <Route path="/users" element={< />} /> */}
      
    </Routes>
    </div>
  </Router>

    </NoteState>
   
    </>
  );
}

export default App;
