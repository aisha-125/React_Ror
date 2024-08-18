import React, { useState } from 'react';
import './Popup.css';

import {
  QuestionCircleOutlined as Question,
  ExclamationCircleOutlined as Exclamation
} from "@ant-design/icons";

function Popup(props) {
  const [formError, setFormError] = useState(false);

  const close = () => {
    setFormError(false);
    props.closePopup();
  };

  const validateInput = (method) => {
    let condition = false;
    let inputs = [];
    document.getElementsByName('input').forEach((i) => {
        if (i.value === "" || i.value.includes(' ')) {
          condition = true;
          setFormError(true);
      } else {
        inputs.push(i.value);
      }
    });

    if(!condition){
      method(inputs);
      setFormError(false);
    }
  };

  return (
    <form className='popup'>
      {props.data.icon === 'question' && <Question className='question icon' />}
      {props.data.icon === 'danger' && <Exclamation className='danger icon' />}
      <h3 className='title-popup'>{props.data.title}</h3>
      {formError && <span>{props.data.error}</span>}
      {props.data.input.map((i, index) =>
        (
        <React.Fragment key={index}>
          <div className='input-container'>
            <input type={i.type} name='input' placeholder={i.placeholder} required={i.required}/>
          </div>
        </React.Fragment>
      )
      )}
      <div className="btns">
        <input className="btn btn-accept" onClick={() => validateInput(props.data.button.method)} type='button' defaultValue={props.data.button.value} readOnly />
        <input type='button' className="btn btn-cancel" onClick={close} defaultValue='Cancelar' readOnly />
      </div>
    </form>
  );
}

export default Popup;