import { render, screen } from "@testing-library/react";
import Bio from "../Bio";
import "@testing-library/jest-dom";
import { useContext } from "react";
import { ThemeContext } from "../../../../context/context";
const BioProps = {
  username: "JohnDoe",
  job: [
    {
      role: "Software Engineer",
      company: "Acme Corp",
    },
  ],
  userImage: "https://example.com/image.png",
  bio: "Lorem ipsum dolor sit amet",
  socialHandles: [
    {
      name: "github",
      url: "https://github.com/johndoe",
    },
    {
      name: "twitter",
      url: "https://twitter.com/johndoe",
    },
    {
      name: "linkeldn",
      url: "https://linkedin.com/in/johndoe",
    },
    {
      name: "website",
      url: "https://johndoe.com",
    },
  ],
};

const mockContextValue = () => {
  return {
    darkTheme: true,
  };
};

const MockProvider = ({ data }) => {
  return (
    <ThemeContext.Provider value={mockContextValue}>
      <Bio {...data} />
    </ThemeContext.Provider>
  );
};

describe("Bio", () => {
  it("should render the user image and name", () => {
    render(<MockProvider data={{ ...BioProps }} />);
    const image = screen.getByAltText("display");
    const name = screen.getByText(BioProps.username);
    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  describe("rendering job", () => {
    it("should render job, if the user has job and role and company i.e (job.length > 0 && job[0].role && job[0].company)", () => {
      render(<MockProvider data={{ ...BioProps }} />);
      const jobTitle = screen.getByText(
        `${BioProps.job[0].role} @${BioProps.job[0].company}`
      );
      expect(jobTitle).toBeInTheDocument();
    });

    it("should render only the works @cavista if user only have company", () => {
      const companyOnly = {
        ...BioProps,
        job: [{ role: "", company: "Cavista" }],
      };
      render(<MockProvider data={{ ...companyOnly }} />);
      const placeOfWork = screen.getByText("Works @Cavista");
      expect(placeOfWork).toBeInTheDocument();
    });
    it("should render only job if user does not have company", () => {
      const jobOnly = {
        ...BioProps,
        job: [{ role: "Frontend", company: "" }],
      };

      render(<MockProvider data={{ ...jobOnly }} />);

      const jobText = screen.getByText(jobOnly.job[0].role);
      expect(jobText).toBeInTheDocument();
    });
    it("should render no_job if user does not have role and company", () => {
      const jobOnly = {
        ...BioProps,
        job: [{ role: "", company: "" }],
      };

      render(<MockProvider data={{ ...jobOnly }} />);

      const jobText = screen.getByText("No_Job");
      expect(jobText).toBeInTheDocument();
    });
    it("should render no_job if user does not have job i.e job.length === 0", () => {
      const jobOnly = {
        ...BioProps,
        job: [],
      };

      render(<MockProvider data={{ ...jobOnly }} />);

      const jobText = screen.getByText("No_Job");
      expect(jobText).toBeInTheDocument();
    });
  });

  it("should render the bio", () => {
    render(<MockProvider data={{ ...BioProps }} />);
    const bioElment = screen.getByText("Lorem ipsum dolor sit amet");

    expect(bioElment).toBeInTheDocument();
  });

  describe("render social media", () => {
    it("should render social media if all social media is in the data", () => {
      render(<MockProvider data={{ ...BioProps }} />);
      // const handleName = BioProps.socialHandles.forEach((handle) => handle.name);
      const github = screen.getByTestId("github");
      const website = screen.getByTestId("website");
      const linkeldn = screen.getByTestId("linkeldn");
      const twitter = screen.getByTestId("twitter");

      expect(github).toBeInTheDocument();
      expect(website).toBeInTheDocument();
      expect(linkeldn).toBeInTheDocument();
      expect(twitter).toBeInTheDocument();
    });

    /// GIT HUB ONLY TEST
    describe.each([
      [
        {
          ...BioProps,
          socialHandles: [
            {
              name: "github",
              url: "https://github.com/johndoe",
            },
            {
              name: "linkeldn",
              url: "",
            },
            {
              name: "twitter",
              url: "",
            },
            {
              name: "website",
              url: "",
            },
          ],
        },
        "should render github only if other fields are present but no url",
      ],
      [
        {
          ...BioProps,
          socialHandles: [
            {
              name: "github",
              url: "https://github.com/johndoe",
            },
          ],
        },
        "Should render github only if only github is present",
      ],
    ])("should render github only", (socialHandlesData, testDescription) => {
      it(testDescription, () => {
        render(<MockProvider data={{ ...socialHandlesData }} />);
        // const handleName = BioProps.socialHandles.forEach((handle) => handle.name);
        const github = screen.getByTestId("github");
        const website = screen.queryByTestId("website");
        const linkeldn = screen.queryByTestId("linkeldn");
        const twitter = screen.queryByTestId("twitter");

        expect(github).toBeInTheDocument();
        expect(website).not.toBeInTheDocument();
        expect(linkeldn).not.toBeInTheDocument();
        expect(twitter).not.toBeInTheDocument();
      });
    });

    /// website only
    describe.each([
      [
        {
          ...BioProps,
          socialHandles: [
            {
              name: "website",
              url: "https://johdoe.com/johndoe",
            },
          ],
        },
        "should render website only if only websit is present",
      ],
      [
        {
          ...BioProps,
          socialHandles: [
            {
              name: "website",
              url: "https://johdoe.com/johndoe",
            },
            {
              name: "github",
              url: "",
            },
            {
              name: "twitter",
              url: "",
            },
            {
              name: "linkeldn",
              url: "",
            },
          ],
        },
        "should render website only if other fields are present but no url",
      ],
    ])("should render website only", (socialHandlesData, testDescription) => {
      it(testDescription, () => {
        render(<MockProvider data={{ ...socialHandlesData }} />);
        // const handleName = BioProps.socialHandles.forEach((handle) => handle.name);
        const website = screen.getByTestId("website");
        const github = screen.queryByTestId("github");
        const linkeldn = screen.queryByTestId("linkeldn");
        const twitter = screen.queryByTestId("twitter");

        expect(website).toBeInTheDocument();
        expect(github).not.toBeInTheDocument();
        expect(linkeldn).not.toBeInTheDocument();
        expect(twitter).not.toBeInTheDocument();
      });
    });

    // twitter only
    describe.each([
      [
        {
          ...BioProps,
          socialHandles: [
            {
              name: "twitter",
              url: "https://github.com/johndoe",
            },
          ],
        },
        "should render twitter only if only github is present",
      ],
      [
        {
          ...BioProps,
          socialHandles: [
            {
              name: "github",
              url: "",
            },
            {
              name: "twitter",
              url: "https://twitter.com/in/johndoe",
            },
            {
              name: "linkeldn",
              url: "",
            },
            {
              name: "website",
              url: "",
            },
          ],
        },
        "should render twitter only if other handles is present but no url",
      ],
    ])("should render twitter only", (socialHandlesData, testDescription) => {
      it(testDescription, () => {
        render(<MockProvider data={{ ...socialHandlesData }} />);
        // const handleName = BioProps.socialHandles.forEach((handle) => handle.name);
        const website = screen.queryByTestId("website");
        const github = screen.queryByTestId("github");
        const linkeldn = screen.queryByTestId("linkeldn");
        const twitter = screen.getByTestId("twitter");

        expect(website).not.toBeInTheDocument();
        expect(github).not.toBeInTheDocument();
        expect(linkeldn).not.toBeInTheDocument();
        expect(twitter).toBeInTheDocument();
      });
    });

    // linkeldn only
    describe.each([
      [
        {
          ...BioProps,
          socialHandles: [
            {
              name: "linkeldn",
              url: "https://github.com/johndoe",
            },
          ],
        },

        "should render linkeldn only if only linkeldn is present",
      ],

      [
        {
          ...BioProps,
          socialHandles: [
            {
              name: "github",
              url: "",
            },
            {
              name: "twitter",
              url: "",
            },
            {
              name: "linkeldn",
              url: "https://linkedin.com/in/johndoe",
            },
            {
              name: "website",
              url: "",
            },
          ],
        },
        "should render linkeldn only if linkeldn if present and others are there but no url",
      ],
    ])("should render linkeldn only", (socialHandlesData, testDescription) => {
      it(testDescription, () => {
        render(<MockProvider data={{ ...socialHandlesData }} />);

        const website = screen.queryByTestId("website");
        const github = screen.queryByTestId("github");
        const linkeldn = screen.getByTestId("linkeldn");
        const twitter = screen.queryByTestId("twitter");

        expect(website).not.toBeInTheDocument();
        expect(github).not.toBeInTheDocument();
        expect(linkeldn).toBeInTheDocument();
        expect(twitter).not.toBeInTheDocument();
      });
    });
  });
});
