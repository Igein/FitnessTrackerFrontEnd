import { react, useEffect, useState } from "react";
import reactDom from "react-dom/client";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import "./style.css";
import { getRoutines, getActivities, getUserDetails, getRoutinesByUser } from "./api";
import { Navbar, Routines, Home, Activities, Login, Register, MyRoutines, CreateRoutine, EditRoutine, CreateActivity} from "./components/index";

const App = () => {
  const [routines, setRoutines] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [activities, setActivities] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(0);
  
  
  
  
  
  
  

  const navigate = useNavigate();
  

  async function getMe() {
    const storedToken = window.localStorage.getItem('token');
    if(!token){
        if(storedToken){
        setToken(storedToken);
        }
        return;
    }
    const results = await getUserDetails(token)
    if(results){
    setUser(results)
    setUsername(results.username)
    setUserId(results.id)
    } else {
        console.log("error getting me")
    }
}


const retrievePublicRoutines = async () => {
    const results = await getRoutines();
    setRoutines(results);
};

const retrieveAllActvities = async () => {
  const results = await getActivities();
  setActivities(results);
};


useEffect(() => {
  retrievePublicRoutines();
}, []);
useEffect(() => {
  retrieveAllActvities();
}, []);
useEffect(() => {
  getMe();
}, [token]);

  

  return (
    <div>
      <Navbar setToken={setToken} token={token}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/routines" element={<Routines routines={routines} navigate={navigate} />} />
        <Route path="/activities" element={<Activities activities={activities} navigate={navigate} />} />
        <Route path='/login' element={<Login setToken={setToken} navigate={navigate}/>} />
        <Route path='/register' element={<Register setToken={setToken} navigate={navigate} />} />
        <Route path='/myroutines' element={<MyRoutines token={token}  username={username} activities={activities}/>} />
        <Route path='/createroutine' element={<CreateRoutine token={token} navigate={navigate} />}></Route>
        <Route path='/createactivity' element={<CreateActivity token={token} navigate={navigate}/>}></Route>
        

      </Routes>
    </div>
  );
};


const app = document.querySelector("#app");
const root = reactDom.createRoot(app);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
