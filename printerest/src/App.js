import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import UserTemplate from './template/UserTemplate';
import DetailPicture from './pages/DetailPicture/DetailPicture';
import CreatePicture from './pages/CreatePicture/CreatePicture';
import Login from './pages/Login/Login';
import UserInfo from './pages/UserInfo/UserInfo';
import UpdateUser from './pages/UpdateUser/UpdateUser';

function App() {
  return (
      <Routes>
        <Route path='/' element={<UserTemplate />} >
          <Route index element={<HomePage />} />
          <Route path='/detail/:id' element={<DetailPicture />}/>
          <Route path='/create' element={<CreatePicture />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/user-info' element={<UserInfo />} />
          <Route path='/update-user' element={<UpdateUser />} />
        </Route>
      </Routes>
  );
}

export default App;
