const formartDate = (date: string, type = "normal") => {
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

  if (type === "days") {
    const today = +new Date();
    const postedDate = +new Date(date);
    const timeDifference = Math.floor((today - postedDate) / 1000);

    if (timeDifference < 60) return "just now";
    else if (timeDifference < 3600)
      return `${Math.floor(timeDifference / 60)} mins ago`;
    else if (timeDifference < 86400)
      return `${Math.floor(timeDifference / 3600)} hour ago`;
    else if (timeDifference < 86400 * 2)
      return `${Math.floor(timeDifference / 86400)} days ago`;
    else return `${month} ${day}, ${year}`;
  } else return `${month} ${day}, ${year}`;
};

export default formartDate;
