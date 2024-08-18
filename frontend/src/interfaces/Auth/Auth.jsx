import Singup from "../../components/SingUp/Singup";
import Login from "../../components/LogIn/Login";

import './Auth.css';

import { useState } from "react";

function Auth() {
  const [form, setForm] = useState(true);

  const changeForm = () => {
    setForm(form ? false : true );
  }

  return (
    <>
      <div className={`form-container ${form ? 'show' : ''}`}>
        <Singup changeForm={changeForm} />
        <button name="btn" className='login-btn' onClick={changeForm}>Iniciar sesión</button>
      </div>
      <div className={`form-container ${!form ? 'show' : ''}`}>
        <Login />
        <button name="btn" className='login-btn' onClick={changeForm}>Crear cuenta</button>
      </div>
    </>
  );
}

export default Auth;