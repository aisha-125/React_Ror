import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./Header.css";
import Nav from "../Nav/Nav";

function Header() {
  const [close, setClose] = useState(true);

  function changeIcon() {
    setClose(close ? false : true);
  }

  return (
    <header className="light">
      <div className="main-header">
        <div className="header-logo-container"><img src="/Logo/Logo-claro-sinBG.png" alt="Logo de la empresa, hombre/estrella de color rojo cayendo envuelto en una linea negra." /></div>
        <div onClick={changeIcon} className="icon-menu-container">
          <div className={`icon-menu ${close ? 'show' : ''}`}><MenuOutlined className="icon" /></div>
          <div className={`icon-menu ${!close ? 'show' : ''}`}><CloseOutlined className="icon" /></div>
        </div>
      </div>
      <div className={`nav-container ${!close ? 'show' : ''}`}>
        <Nav />
      </div>
    </header>
  );
}

export default Header;