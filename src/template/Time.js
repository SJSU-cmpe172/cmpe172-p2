export const getDate = (ms) => {
    let date = new Date(ms);
    return date.toLocaleDateString();
  }

export const getTime = (ms) => {
    let date = new Date(ms);
    return date.toLocaleTimeString();
  }

export const getTimeToComplete = (start, end) => {
    let diff = end - start;
    let hh = Math.floor(diff / 1000 / 60 / 60);
    diff -= hh * 1000 * 60 * 60;
    let mm = Math.floor(diff / 1000 / 60);
    diff -= mm * 1000 * 60;

    let time = (hh + " Hrs " + mm + " Mins");

    return time;
  };