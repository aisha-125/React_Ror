import { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthContext'

import {
  FileImageFilled
} from '@ant-design/icons';

import {
  Switch,
  message
} from 'antd';

import Popup from '../../components/PopUp/Popup'
import './Profile.css';
import AuthService from "../../services/Auth/auth.service";
import UserService from "../../services/User/user.service";

function Profile() {

  const nav = useNavigate();

  const [data, setData] = useState({});
  const [popup, setPopup] = useState(false);
  const userContext = useContext(AuthContext);
  const userData = userContext[3];
  const [settings, setSettings] = useState(userData.setting);


  useEffect(() => {
    handleUpdateSettings();
  }, [settings]);

  //Create PopUp for change password
  const changePassword = () => {
    let data = {
      title: 'Introduce tu contraseña y tu nueva contraseña',
      icon: 'question',
      input: [
        {
          placeholder: 'Contraseña',
          required: true,
          type: 'password',
          error: 'El campo no puede estar vacio'
        },
        {
          placeholder: 'Nueva contraseña',
          required: true,
          type: 'password',
          error: 'El campo no puede estar vacio'
        }
      ],
      button: {
        method: (val) => {
          let credentials = btoa(`${val[0]}:${val[1]}`);
          UserService.updateUserPassword(userData.id, credentials).then(res => {
            message.success('Contraseña cambiada correctamente')
            closePopup()
          }
          ).catch(err => {
            message.error('Contraseña incorrecta');
          }
          )
        },
        value: 'Cambiar'
      }
    }
    setData(data);
    setPopup(true);
  };

  //Creation PopUp for delete account
  const deleteAccount = () => {
    let data = {
      title: '¿Estás seguro/a?',
      description: 'Está acción no se puede cambiar',
      icon: 'danger',
      input: [
        {
          placeholder: 'Contraseña',
          required: true,
          type: 'password',
          error: 'El campo no puede estar vacio'
        }
      ],
      button: {
        method: (val) => {
          AuthService.deleteAccount().then(res => {
            message.destroy('Cuenta borrada')
            nav('/auth');
            localStorage.removeItem('token');
            closePopup()
          }
          ).catch(err => console.error(err))
        },
        value: 'Borrar'
      }
    }
    setData(data);
    setPopup(true);
  };

  const closePopup = () => {
    setPopup(false);
  };

  const updateUser = () => {
    if (localStorage.getItem('token') !== null) {
      AuthService.checkAuth().then(res => {
        userContext[1](res);
      }).catch(
        err => console.error(err)
      );
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleUpdateImage(file);
  };

  const handleUpdateImage = (image) => {
    const formData = new FormData();
    formData.append('user[image]', image);
    UserService.updateUserImage(userData.id, formData).then(r => updateUser()).catch(err => console.error(err));
  }

  const handleInputSettings = (name, value) => {
    setSettings((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateSettings = () => {
    UserService.updateSettings(settings.id, settingsFormData())
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

  const settingsFormData = () => {
    const formData = new FormData();

    formData.append('setting[font_size]', settings.font_size)
    formData.append('setting[light_mode]', settings.light_mode)
    return formData;
  }

  const showProfile = () => {
    return (
      <>
        <form className="form-user">
          <div className="img-profile">
            <img src={userData.image ? userData.image.url : '/Imgs/default_user.png'} alt="Foto de perfil de usuario" />
            <label className="img-label" htmlFor="img-btn">
              <input id="img-btn" className="img-btn" onChange={handleFileChange} type="file" accept="image/*" multiple={false} />
              <FileImageFilled className="icon-profile" />
            </label>
          </div>
          <div className="settings-container">
            <p className="settings-header">Settings</p>
            <label className="label-switch" htmlFor="light_mode">Modo luminoso:
              <Switch id="light_mode" onChange={(checked) => handleInputSettings('light_mode', checked)} checked={settings.light_mode} type="checkbox" name="light_mode" />
            </label>
            <div className="font-size-fields-container">
              <label htmlFor="normalFontSize">Normal:
                <input className="fields" checked={settings.font_size === 'normal'} onChange={() => handleInputSettings('font_size', 'normal')} type="radio" name="font_size" id="normalFontSize" value="normal" />
              </label>
              <label htmlFor="BigFontSize">Grande:
                <input className="fields" checked={settings.font_size === 'big'} onChange={() => handleInputSettings('font_size', 'big')} type="radio" name="font_size" id="BigFontSize" value="big" />
              </label>
            </div>
          </div>
        </form>
        <div className='account-data'>
          <p onClick={changePassword} className='data-change'>Cambiar contraseña</p>
          <p onClick={deleteAccount} className='data-change'>Borrar cuenta</p>
        </div>
        <div className="popup-container">
          {popup && <Popup data={data} closePopup={closePopup} />}
        </div>
      </>
    );
  }

  return (
    <div className="profile">
      {userData && showProfile()}
    </div>
  );
}

export default Profile;