import axios from "axios";

export const registerStaff = newStaff => {
  return axios
    .post("/api/users/register", {
      username: newStaff.username,
      password: newStaff.password,
      privilege: newStaff.privilege
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
};

export const login = user => {
  return axios
    .post("/api/users/login", {
      username: user.username,
      password: user.password
    })
    .then(response => {
      if (response) {
        localStorage.setItem("usertoken", response.data);
        return response.data;
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const loginStaff = staff => {
  console.log(staff);
  return axios
    .post("/api/users/staffLogin", {
      staffId: staff.username,
      password: staff.password
    })
    .then(response => {
      if (response) {
        localStorage.setItem("usertoken", response.data);
        return response.data;
      }
    })
    .catch(err => {
      console.log(err);
    });
};
