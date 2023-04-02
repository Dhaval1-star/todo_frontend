import logo from './logo.svg';
import './App.css';

import Nave from './component/Nave';
import { Route , Routes, useNavigate } from 'react-router-dom';
import Register from './component/Register';
import Signin from './component/Signin';
import Home from './component/Home';
import { createContext, useReducer, useState } from 'react';
import Cookies from 'universal-cookie';
import Todo from './component/Todo';
import signInReducer from './reducer/signInReducer';

export const UserContext = createContext();

function App() {

  const cookies = new Cookies()
  const navigator = useNavigate()
  const [token , setToken] = useState(cookies.get("token"))

  const [state , dispatch] = useReducer(signInReducer , { status : "signOut" , token : cookies.get("token") });
  
  function userGetSignIn(param) {
    return dispatch({
      type : "signIn",
      payload : { status : "signIn" , data : param }
    })
  }

  
  function userGetSignOut() {
    return dispatch({
      type : "signOut",
      payload : { status : "signOut" }
    })

  }


  return (
    <>
      <UserContext.Provider value={{ ...state , userGetSignIn , userGetSignOut }}>
        <Nave  />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signIn" element={<Signin />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
