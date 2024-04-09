import './App.css';
import Docs from './components/docs';
import EditDocs from './components/EditDocs';
import { Routes, Route } from "react-router-dom";
import { app, database } from './components/firebaseConfig';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/" element={<Docs database={database} />} />
      <Route path="/editDocs/:id" element={<EditDocs database={database}/>} />
      
      
    </Routes>
  );
}

export default App;