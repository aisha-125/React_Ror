import { useParams } from "react-router-dom";
import ActivityService from "../../services/Activity/activity.service";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import './Activity.css';
import {message} from 'antd';

function Activity() {
  const { id } = useParams();
  const [activity, setActivity] = useState({});
  const userContext = useContext(AuthContext);
  const userData = userContext[3];
  const [slide, setSlide] = useState(0);

  const fetchActivity = async () => {
    try {
      const fetchedActivity = (await ActivityService.getActivity(id)).data;
      setActivity(fetchedActivity);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchActivity();
  }, []);

  const inscription = () => {
    let formData = new FormData();
    formData.append('client_id', userData.id)
    ActivityService.addClient(id, formData).then(r => {
      if (r.data.message == "Ningún cliente agregado") {
        message.warning("Ya estás inscrito en está actividad")
      } else {
        message.success("Te has inscrito a esta actividad")
      }
    }).catch(err => console.error(err))
  };

  const showSlide = (idSlide, e) => {
    setSlide(idSlide);
    let dots = document.getElementsByClassName("dot");
    for (let i = 0; i < dots.length; i++) {
      console.log(dots[i]);
      dots[i].className = dots[i].className.replace(" active", "");
    }
    e.target.className += " active"
  };

  const showActivity = () => {
    return (
      <div className="content-container">
        {slide === 0 ? <div className="image-container">
          <img src={activity.image ? activity.image.url : '/Imgs/default_place.png'} alt="Imagen descriptiva de la actividad" />
          {activity.coordinator && <div className="image-coordinator">
            <img src={activity.coordinator.image ? activity.coordinator.image.url : '/Imgs/default_user.png'} alt="Imagen de perfil del coordinador" />
          </div>}
        </div> : <div className="data-activity">
          <p>{activity.name}</p>
          <p>{activity.description}</p>
        </div>}
        <div className="dots-container">
          <span className="dot active" onClick={(e) => { showSlide(0, e) }}></span>
          <span className="dot" onClick={(e) => { showSlide(1, e) }}></span>
        </div>
        <div className="btn-container">
          {userData && <button className="btn-submit btn-activity" onClick={inscription}>Inscribirse</button>}
        </div>
      </div>
    );
  }

  return (
    <>
      {activity && showActivity()}
    </>
  );
}


export default Activity;