import axios from "axios";

export const loadItems = () => {
  return axios
    .get("/api/amenities/getItems")
    .then(res => {
      const items = res.data;
      return items;
    })
    .catch(err => console.log(err));
};
