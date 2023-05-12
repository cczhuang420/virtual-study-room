import "@testing-library/jest-dom";
import { expect, it } from "vitest";
import { render } from "@testing-library/react";
import TopLeaderCard from "../leaderboard/TopLeaderCard.jsx";
import profileImage from "../../assets/profiles/boy1.png";

it("renders correctly when the name is not provided", () => {
  const ranking = 2;
  const name = "Sam";
  const hours = 100;

  const { getByText, queryByRole, queryByText } = render(
    <TopLeaderCard
      profileImage={profileImage}
      ranking={ranking}
      hours={hours}
    />
  );

  // Ensure the user name does not appear
  expect(queryByText("Sam")).not.toBeInTheDocument();

  // Ensure the hour appears correctly.
  expect(getByText("100 hours")).toBeInTheDocument();

  // Check that there is an image
  const image = queryByRole("Image");
  expect(image).toBeDefined();
});

it("renders correctly when the profile image is not provided", () => {
  const ranking = 2;
  const name = "Sam";
  const hours = 100;

  const { getByText, queryByRole } = render(
    <TopLeaderCard ranking={ranking} name={name} hours={hours} />
  );

  // Ensure the user name appears correctly
  expect(getByText("Sam")).toBeInTheDocument();

  // Ensure the hour appears correctly.
  expect(getByText("100 hours")).toBeInTheDocument();

  // Check that there are no profile images
  const image = queryByRole("Image");
  expect(image).toBeNull();
});

it("renders correctly when all the inputs are provided", () => {
  const ranking = 2;
  const name = "Sam";
  const hours = 100;

  const { getByText, queryByRole } = render(
    <TopLeaderCard
      profileImage={profileImage}
      name={name}
      ranking={ranking}
      hours={hours}
    />
  );

  // Ensure the user name appears correctly
  expect(getByText("Sam")).toBeInTheDocument();

  // Ensure the hour appears correctly.
  expect(getByText("100 hours")).toBeInTheDocument();

  // Check that there is an image
  const image = queryByRole("Image");
  expect(image).toBeDefined();
});
