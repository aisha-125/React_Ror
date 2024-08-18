import http from '../http-common';


const getEmployees = () => {
  return http.get('/employees');
};

const updateUserPassword = (id, credentials) => {
  return http.put(`/users/${id}/update_password`, null, {
    headers: {
      ...http.defaults.headers.common,
      Authorization: `Basic ${credentials}`
    }
  });
};
const updateUserImage = (id, image) => {
  return http.put(`/users/${id}/update_image`, image);
};

const updateSettings = (id, data) => {
  return http.put(`/settings/${id}`, data)
}

// const getUsers = () => {
//   return http.get('/users');
// };

// const getUser = (clave) => {
//   return http.get(`/users/user?clave=${clave}`);
// };

// const createUser = (data) => {
//   return http.post('/users', data);
// };


// const deleteUser = (email) => {
//   return http.delete(`/users/user?email=${email}`);
// };


const UserService = {
  getEmployees,
  updateUserPassword,
  updateUserImage,
  updateSettings
};


export default UserService;