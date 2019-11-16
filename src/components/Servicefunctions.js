import axios from "axios";
import jwt_decode from "jwt-decode";
import { createjob } from "./JobFunctions";

export const loadItems = () => {
  return axios
    .get("/api/amenities/getItems")
    .then(res => {
      console.log(res.data);
      const items = res.data.Item.amenities;
      return items;
    })
    .catch(err => console.log(err));
};

export const createAmenityJob = itemList => {
  const token = localStorage.usertoken;
  const decoded = jwt_decode(token);
  let dt = Date(Date.now());
  console.log(dt.toString());
  let newJob = {};
  newJob.room = decoded.roomNum;
  newJob.type = "amenities";
  newJob.status = "new";
  //newJob.dtCreated =

  /*
  room: jobObj.room,
      type: jobObj.type,
      status: jobObj.status,
      dtCreated: jobObj.dtCreated,
      dtWorked: jobObj.dtWorked,
      dtCompleted: jobObj.dtCompleted,
      staff: jobObj.staff,

      //job specific
      items: jobObj.items, //can be used for amenties or food
      dtPickup: jobObj.dtPickup, //shuttle
      destination: jobObj.destination, //shuttle
      ticketNo: jobObj.ticketNo //valet
      */
};
