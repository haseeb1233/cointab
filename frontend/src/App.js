
import './App.css';
import Home from './components/Home';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from './components/Post';

function App() {
  return (
    <div className="App">
   <BrowserRouter>
   <Routes>
   <Route path='/' element = {<Home/>}/>
   <Route path='/page' element ={<Post/>}/>
   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
