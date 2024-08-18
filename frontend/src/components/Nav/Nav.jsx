import AuthService from '../../services/Auth/auth.service';
import { Link, useNavigate } from 'react-router-dom';

import './Nav.css';
import { useContext } from 'react';

import { AuthContext } from '../../context/AuthContext/AuthContext';
import { message } from 'antd';

function Nav() {
  const nav = useNavigate();
  const userStatus = useContext(AuthContext);

  const logoutActions = () => {
    message.warning('Logout exitoso');
    nav('/auth')
    userStatus[2]();
    localStorage.removeItem('token');
    localStorage.removeItem('lastLoginTime');
  };
  
  const logOut = () => {
    if (localStorage.getItem('token') != null) {
      AuthService.logoutUser()
      .then(r => {
          logoutActions();
        })
        .catch(e => console.error(e))
    } else {
      console.error('Token didn\'t exist');
    }
  }

  return (
    <nav>
      <ul>
        <li className='profile-link'>
          <Link to='/profile' className='link'>
            <div className='nav-icon'></div>
            <p>Perfil</p>
          </Link>
        </li>
        <li className='helper-link'>
          <a href="/Help/Manual de ayuda.html" className='link'>
            <div className='nav-icon'>
              
            </div>
            <p>Ayuda</p>
          </a>
        </li>
        <li className='activities-link'>
          <Link to="/activities" className='link'>
            <div className='nav-icon'>

            </div>
            <p>Actividades</p>
          </Link>
        </li>
        <li className='report-link'>
          <a href='http://localhost:5488/templates/wZPcEggEQ' className='link'>
            <div className='nav-icon'></div>
            <p>Reporte</p>
          </a>
        </li>
        <li onClick={logOut}>
          <div className='link'>
            <div className='nav-icon'>

            </div>
            <p>Log Out</p>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;