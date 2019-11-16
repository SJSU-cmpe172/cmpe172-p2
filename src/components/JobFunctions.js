import axios from "axios";

export const getJobs = () => {
  axios.get("/api/jobs/getJobs").then(res => {
    return res.data.Item.jobs;
  });
};

export const createJob = jobObj => {
  const jobId = Date.now();
  axios
    .post("/api/jobs/create", {
      id: jobId,
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
    })
    .then(response => {
      console.log(response);
    });
};
