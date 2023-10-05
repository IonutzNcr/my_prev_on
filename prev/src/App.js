
import './App.css';
import './nav.css'
import './auth.css'
import './friends.css'
import './movie.css'
import { Authorization } from './pages/Authorization';
import { Friends } from './pages/Friends';
import {Home} from './pages/Home';


// This is a React Router v6 app
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path = "/friends" element={<Friends />} />
        <Route path='/authorization' element={<Authorization />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
