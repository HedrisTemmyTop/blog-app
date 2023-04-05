const formartDate = (date) => {
  const postedDateStr = new Date(date);
  let months = [
    "January",
    "Februry",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[postedDateStr.getMonth()];
  const day = postedDateStr.getDate();
  const year = postedDateStr.getFullYear();
  return `${month} ${day}, ${year}`;
};

export default formartDate;
