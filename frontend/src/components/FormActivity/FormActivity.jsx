import { useEffect, useState } from 'react';
import UserService from '../../services/User/user.service';
import ActivityService from "../../services/Activity/activity.service";
import './FormActivity.css';

function FormActivity(props) {
  const { activityData, setActivityData, statusForm, setStatusForm, fetchActivities } = props;
  const [employees, setEmployees] = useState([]);

  const closeActivityForm = () => {
    setStatusForm('hidden');
  };

  async function fetchEmployees() {
    try {
      const fetchedEmployees = (await UserService.getEmployees()).data;
      setEmployees(fetchedEmployees);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setActivityData((prevData) => ({
      ...prevData,
      activityImage: file,
    }));
  };


const handleInputChange = (e) => {
  const { name, value } = e.target;
  setActivityData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const addActivity = () => {
  const newActivity = formattedActivity();
  ActivityService.createActivity(newActivity).then(res => {
    console.log('ok');
    fetchActivities();
    setStatusForm('');
  }).catch(error => console.error('No ok ' + error));
};

const editActivity = async () => {
  const activity = formattedActivity();
  let id = activityData.activityId
  console.log(id);
  console.log(activity);
  ActivityService.updateActivity(id, activity).then(res => {
    fetchActivities();
    setStatusForm('');
    console.log(res);
  }).catch(error => console.error(error));
}

const addImage=(formData)=>{
  console.log(activityData.activityImage);
  if (activityData.activityImage != null && !activityData.activityImage.url) {
    formData.append('activity[image]', activityData.activityImage);
  }
}

const formattedActivity = () => {
  const formData = new FormData();
  formData.append('activity[name]', activityData.activityName);
  formData.append('activity[description]', activityData.activityDescription);
  formData.append('activity[date]', activityData.activityDate);
  formData.append('activity[user_id]', activityData.activityCoordinator);
  formData.append('activity[employee_ids]', [1]);
  formData.append('activity[places]', activityData.activityPlaces);
  
  addImage(formData);

  return formData;
};

return (
  <form className={`activity-form ${statusForm}`} encType="multipart/form-data">
    <h3>Actividad</h3>
    <label className='activity-label' htmlFor='activityName'>Nombre</label>
    <input onChange={e => handleInputChange(e)} value={activityData.activityName} id='activityName' name="activityName" type="text" />
    <label className='activity-label' htmlFor='activityDescription'>Descripción</label>
    <input onChange={e => handleInputChange(e)} value={activityData.activityDescription} id="activityDescription" name="activityDescription" type="text" />
    <label className='activity-label' htmlFor='activityDate'>Fecha</label>
    <input onChange={e => handleInputChange(e)} value={activityData.activityDate} id='activityDate' name="activityDate" type="date" />
    <label className='activity-label' htmlFor='activityPlaces'>Límite de plazas</label>
    <input onChange={e => handleInputChange(e)} value={activityData.activityPlaces} id='activityPlaces' name="activityPlaces" type="number" />

    <select onChange={e => handleInputChange(e)} value={activityData.activityCoordinator} name="activityCoordinator" id="activityCoordinator">
      <option value="0" disabled>Coordinador</option>
      {employees && employees.map((e) => (
        <option key={e.id} value={e.id}>{e.nickname}</option>
      ))}
    </select>

    <select value={activityData.activityAssistants} onChange={e => handleInputChange(e)} name="activityAssistants" id="activityAssitants">
      <option value="" disabled>Asistentes</option>
      {employees && employees.map((e) => (
        <option key={e.id} value={e.id}>{e.nickname}</option>
      ))}
    </select>

    <input onChange={e => handleFileChange(e)} type="file" accept="image/*" multiple={false} />

    <div className='btns'>
      {!activityData.activityId && <input onClick={addActivity} defaultValue='Añadir' className='btn-accept btn' type="button" />}
      {activityData.activityId && <input onClick={editActivity} defaultValue='Editar' className='btn-accept btn' type="button" />}
      <input onClick={closeActivityForm} defaultValue='Cerrar' className='btn-cancel btn' type="button" />
    </div>
  </form>
);
}

export default FormActivity;