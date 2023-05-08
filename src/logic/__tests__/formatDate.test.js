import formartDate from "../formartDate";

// const mockFormValidation = jest.fn();

test("should test for rendering normal format of 13/2/2022", () => {
  const result = formartDate("2023-05-07T00:34:33.014Z");
  expect(result).toBe("May 7, 2023");
});

test("should test for rendering just now", () => {
  const today = new Date();

  today.setSeconds(today.getSeconds() - 59); // set to 59 sec

  const result = formartDate(today, "days");

  expect(result).toBe("just now");
});
test("should test for rendering minute", () => {
  const today = new Date();
  today.setMinutes(today.getMinutes() - 59); // set to 59 min

  const result = formartDate(today, "days");

  expect(result).toBe("59 mins ago");
});

test("should test for rendering hour", () => {
  const today = new Date();
  today.setHours(today.getHours() - 23); // set to 23 hrn

  const result = formartDate(today, "days");

  expect(result).toBe("23 hour ago");
});
test("should test for rendering days", () => {
  const today = new Date();
  today.setDate(today.getDate() - 1); // set to 1 dau

  const result = formartDate(today, "days");

  expect(result).toBe("1 days ago");
});
test("should test for rendering date", () => {
  const today = new Date();
  today.setDate(today.getDate() - 2); // set to 1 dau

  const result = formartDate(today, "days");
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
  const month = months[today.getMonth()];
  const day = today.getDate();
  const year = today.getFullYear();
  expect(result).toBe(`${month} ${day}, ${year}`);
});
