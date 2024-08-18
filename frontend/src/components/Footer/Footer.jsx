import './Footer.css';

import React, { useEffect, useState } from 'react';

function Footer() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      // La imagen se ha cargado con éxito
      setImageLoaded(true);
    };
    image.src = "/Logo/Logo-light-name-noBG.svg";

  }, []);



  return (
    <footer className="logo-footer-container">
      {/* <div className="logo-footer-container"> */}
        {imageLoaded ? (
          <img
            src="/Logo/Logo-light-name-noBG.svg"
            alt="Logo de la empresa, hombre/estrella de color rojo cayendo envuelto en una linea negra. Por debajo de la linea negra, escrito con una ligera curva esta el nombre de la marca"
          />
        ) : null}
      {/* </div> */}
      {/* <div className="socialmedia-icons-container">
        <ul>
          <li className="socialmedia-icons"></li>
          <li className="socialmedia-icons"></li>
          <li className="socialmedia-icons"></li>
          <li className="socialmedia-icons"></li>
        </ul>
      </div>
      <div className="politics-container">

      </div> */}
    </footer>
  );
}

export default Footer;