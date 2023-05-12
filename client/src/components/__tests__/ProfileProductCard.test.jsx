import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import ProfileProductCard from "../products/ProfileProductCard.jsx";
import ProfileImage from "../../assets/profiles/boy1.png";

it("renders correctly when the value is not provided", () => {
  const productName = "Boy 1";
  const productId = 7839450294;

  const { getByText, queryByRole, queryByText } = render(
    <ProfileProductCard
      productName={productName}
      image={ProfileImage}
      productId={productId}
    />
  );

  // Ensure the cost of the profile does not appear
  expect(queryByText("200")).not.toBeInTheDocument();
  // Ensure the product name appears correctly
  expect(getByText("Boy 1")).toBeInTheDocument();

  // Check that there is an image
  const image = queryByRole("Image");
  expect(image).toBeDefined();
});

it("renders correctly when name is not provided", () => {
  const value = 200;
  const productName = "Boy 1";
  const productId = 7839450294;

  const { getByText, queryByRole, queryByText } = render(
    <ProfileProductCard
      value={value}
      image={ProfileImage}
      productId={productId}
    />
  );

  // Ensure the cost of the profile appears correctly
  expect(getByText("200")).toBeInTheDocument();
  // Ensure the product name does not appear
  expect(queryByText("Boy 1")).not.toBeInTheDocument();

  // Check that there is an image
  const image = queryByRole("Image");
  expect(image).toBeDefined();
});

it("renders correctly when the image is not provided", () => {
  const value = 200;
  const productName = "Boy 1";
  const productId = 7839450294;

  const { getByText, queryByRole } = render(
    <ProfileProductCard
      value={value}
      productName={productName}
      productId={productId}
    />
  );

  // Ensure the cost of the profile appears correctly
  expect(getByText("200")).toBeInTheDocument();
  // Ensure the product name appears correctly
  expect(getByText("Boy 1")).toBeInTheDocument();

  // Check that there are no images
  const image = queryByRole("Image");
  expect(image).toBeNull();
});

it("renders correctly when all inputs are provided", () => {
  const value = 200;
  const productName = "Boy 1";
  const productId = 7839450294;

  const { getByText, queryByRole } = render(
    <ProfileProductCard
      value={value}
      productName={productName}
      image={ProfileImage}
      productId={productId}
    />
  );

  // Ensure the cost of the profile appears correctly
  expect(getByText("200")).toBeInTheDocument();
  // Ensure the product name appears correctly
  expect(getByText("Boy 1")).toBeInTheDocument();

  // Check that there is an image
  const image = queryByRole("Image");
  expect(image).toBeDefined();
});
