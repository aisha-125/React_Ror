import http from '../http-common';


const getLocations = () => {
  return http.get('/locations');
};

const getLocation = (id) => {
  return http.get(`/locations/${id}`);
};

const createLocation = (data) => {
  return http.post('/locations', data);
};

const updateLocation = (id, data) => {
  return http.put(`/locations${id}`, data);
};

const deleteLocation = (id) => {
  return http.delete(`/locations/${id}`);
};

const LocationService = {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation
};


export default LocationService;