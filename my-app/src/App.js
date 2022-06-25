import { Route, Redirect } from "react-router-dom";
import { useState } from "react";
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from "./components/home/Home";
import Admin from "./components/admin/Admin";

function App() {

  const [userId, setUserId] = useState('')

  return (
   <div>
    


     <Route exact path="/">
        <Redirect to="/Login" />
      </Route>


      <Route path="/Login">
        <Login setUserId={setUserId}/>
      </Route>

      <Route path="/Register">
        <Register/>
      </Route>

      <Route exact path="/Home">
        <Home userId={userId}/>
      </Route>

      <Route exact path="/Admin">
        <Admin/>
      </Route>


   </div>
  );
}

export default App;
