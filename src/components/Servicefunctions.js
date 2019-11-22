import axios from "axios";
import jwt_decode from "jwt-decode";
import { createJob } from "./JobFunctions";

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

export const loadDestinations = () => {
  return axios
    .get("/api/destinations/getDestinations")
    .then(res => {
      console.log(res.data);
      const destinations = res.data.Item.destinations;
      return destinations;
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
  newJob.items = itemList;
  createJob(newJob);
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

export const createShuttleJob = shuttleJob => {
  console.log(shuttleJob);
  const token = localStorage.usertoken;
  const decoded = jwt_decode(token);
  let dt = Date(Date.now());
  console.log(dt.toString());
  let newJob = {};
  newJob.room = decoded.roomNum;
  newJob.type = "shuttle";
  newJob.status = "new";
  newJob.dtPickup = shuttleJob.pickupDT;
  newJob.destination = shuttleJob.destination;
  createJob(newJob);
};

export const createValetJob = ticketNo => {
  console.log(ticketNo);
  const token = localStorage.usertoken;
  const decoded = jwt_decode(token);
  let dt = Date(Date.now());
  console.log(dt.toString());
  let newJob = {};
  newJob.room = decoded.roomNum;
  newJob.type = "valet";
  newJob.status = "new";
  newJob.ticketNo = ticketNo;
  createJob(newJob);
};
