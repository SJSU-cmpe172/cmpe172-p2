import axios from "axios";

export const getJobs = () => {
  axios.get("/api/jobs/getJobs").then(res => {
    return res.data.Item.jobs;
  });
};

export const createJob = jobObj => {
  const jobId = Date.now();
  const tempObj = {
    id: jobId,
    room: "-1",
    type: "-1",
    status: "new",
    dtCreated: Date.now(),
    dtWorked: "-1",
    dtCompleted: "-1",
    staff: "-1",
    items: "-1",
    dtPickup: "-1",
    destination: "-1",
    ticketNo: -1
  };

  const finalJob = Object.assign(tempObj, jobObj);

  axios.post("/api/jobs/create", finalJob).then(response => {
    console.log(response);
  });
};
