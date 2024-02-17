import {Routes, Route, Navigate} from 'react-router-dom'
import Register from './pages/register'
import Login from './pages/login'
import Chat from './pages/chat'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'
import NavBar from './components/NavBar'
import { AuthContext } from './context/AuthContext'
import { useContext } from 'react'
import { ChatContextProvider } from './context/ChatContext'



function App() {
  const { user }=useContext(AuthContext);
  // console.log("User",user);

  return(
  <ChatContextProvider user={user}>
    <NavBar/>
    <Container>
      <Routes>
           <Route path="/" element={ user ? <Chat/> : <Login/>}/>
           <Route path="/register" element={ user ? <Chat/> : <Register/>}/>
           <Route path="/login" element={ user ? <Chat/> : <Login/>}/>
           <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
   </Container>
   </ChatContextProvider>
  );
}

export default App
