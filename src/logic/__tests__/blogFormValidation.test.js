import formValidation from "../blogFormValidation";
const formInputs = {
  html: "Lorem ipsum",
  image: "image/src/hero.jpg",

  title: "Tetsing react apps",
  tags: ["hello"],
  description: "testing a react app",
  state: "published",
};

describe("should test validity of inputs", () => {
  test("should return true if all inputs are valid", () => {
    const result = formValidation(...Object.values(formInputs));
    const expectedResult = {
      title: formInputs.title,
      image: [formInputs.image],
      body: formInputs.html,
      tags: formInputs.tags,
      state: formInputs.state,
      description: formInputs.description,
    };
    expect(result).toBeTruthy();
    expect(result).toStrictEqual(expectedResult);
  });

  describe.each([
    [
      {
        ...formInputs,
        html: "",
      },
      "should be falsy if body/html is empty",
    ],
    [
      {
        ...formInputs,
        image: "",
      },
      "should be falsy if image is empty",
    ],
    [
      {
        ...formInputs,
        tags: [],
      },
      "should be falsy if tags is empty",
    ],
  ])("should test invalid input", (invalidInputs, testDescription) => {
    test(testDescription, () => {
      const mockAlert = jest.fn();
      global.alert = mockAlert;
      const result = formValidation(...Object.values(invalidInputs));

      expect(result).toBeFalsy();
      expect(mockAlert).toBeCalled();
      expect(result).toBe(false);
    });
  });
});
