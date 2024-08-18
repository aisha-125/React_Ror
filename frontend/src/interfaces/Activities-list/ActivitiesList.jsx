import { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { SearchOutlined, DeleteOutlined, EditOutlined, AppstoreAddOutlined } from "@ant-design/icons";

import ActivityService from '../../services/Activity/activity.service';
import { AuthContext } from '../../context/AuthContext/AuthContext';

import './ActivitiesList.css';
import FormActivity from "../../components/FormActivity/FormActivity";
import SearchBar from "../../components/SearchBar/SearchBar";


function ActivitiesList() {
  const [activityData, setActivityData] = useState({
  });
  const [activities, setActivities] = useState([]);
  const [statusForm, setStatusForm] = useState('');
  const [statusSearch, setStatusSearch] = useState('close');
  const userContext = useContext(AuthContext);
  const propsActivity = {activityData, setActivityData, statusForm, setStatusForm, fetchActivities}

  async function fetchActivities() {
    try {
      const fetchedActivities = (await ActivityService.getActivities()).data;
      setActivities(fetchedActivities);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchActivities();
  }, []);

  const showSearchBar = () => {
    setStatusSearch('open');
  }
  const closeSearchBar = () => {
    fetchActivities();
    setStatusSearch('close');
  }

  const dateOfToday = () => {
    const today = new Date();

    const formattedToday = `${today.getFullYear()}-${
      (today.getMonth() + 1).toString().padStart(2, '0')
    }-${today.getDate().toString().padStart(2, '0')}`;
    return formattedToday;
  }

  const showActivityForm = () => {
    setActivityData({
      activityId: null,
      activityName: "",
      activityDescription: "",
      activityDate: dateOfToday(),
      activityImage: null,
      activityCoordinator:0,
      activityAssistants: [],
      activityPlaces: 0
  });
    setStatusForm('show');
  }

  const editActivity = (activity) => {
    setActivityData({
      activityId: activity.id,
      activityName: activity.name,
      activityDescription: activity.description,
      activityDate: activity.date,
      activityImage: activity.image,
      activityCoordinator:activity.coordinator.id,
      activityAssistants: activity.assistants,
      activityPlaces: activity.places
  });

    setStatusForm('show');
  }

  const deleteActivity = (id) => {
    ActivityService.deleteActivity(id).then(res => fetchActivities()).catch(err => console.error(err))
  }

   const showActivities = () => {
    return (
      <>
        {activities.map((a) => (
          <div className="activity-card" key={a.id}>
            <div className="img-container"><img src={a.image ? a.image.url : '/Imgs/default_place.png'} alt="Imagen descriptiva de la actividad" /></div>
            <div className="activity-data">
              <p>{a.name}</p>
              <p>{a.date}</p>
            </div>
            <div className="activity-btns">
              {userContext[0] !== 'admin'
                ? <Link to={`activity/${a.id}`} className="see-more">Ver +</Link>
                : <><DeleteOutlined onClick={() => deleteActivity(a.id)} className="activity-icon" />
                <EditOutlined onClick={() => editActivity(a)} className="activity-icon" /></>}
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <SearchBar statusSearch={statusSearch} activities={activities} setActivities={setActivities} closeSearchBar={closeSearchBar}/>
      <div className="activity-content">
      <div className="form-activity-container">
        <FormActivity {...propsActivity} />
      </div>
      <div className="activities-container">
        {activities && showActivities()}
        <div className="icons-container">
          <div className="icon-container">
            <SearchOutlined onClick={showSearchBar} className="icon-float" />
          </div>
          {userContext[0] === 'admin' && <div className="icon-container">
            <AppstoreAddOutlined onClick={showActivityForm} className="icon-float" />
          </div>}
        </div>
      </div>
      </div>
    </>
  );
}

export default ActivitiesList;