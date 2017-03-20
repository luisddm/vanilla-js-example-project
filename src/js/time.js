const time = {
  getTime(date) {
    return new Date(date).toISOString().substring(11, 16);
  },

  getDate(date) {
    return new Date(date).toISOString().substring(0, 10);
  },
};

export default time;
