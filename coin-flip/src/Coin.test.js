import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Coin from "./Coin";

beforeEach(function() {
    jest
      .spyOn(Math, "random")
      .mockReturnValueOnce(0.25)
      .mockReturnValueOnce(0.75);
  });

// smoke test
it("renders without crashing", function() {
  render(<Coin />);
});

// snapshot of coin
it("matches snapshot", function() {
    const { asFragment } = render(<Coin />);
    expect(asFragment()).toMatchSnapshot();
  });

it("coin doesn't show on loadpage", function() {
  const { queryByTestId } = render(<Coin />);

  // expect no image before clicking button
  expect(queryByTestId("coin")).toBeNull();
});

it("show coin and count for heads", function() {
  const { getByText, queryByAltText } = render(<Coin />);
  const button = getByText("Flip");

  // flips to heads
  fireEvent.click(button);

  //expect first image to show heads
  expect(queryByAltText("heads")).toBeInTheDocument();
  expect(queryByAltText("tails")).not.toBeInTheDocument();
  // expect phrase to have 1 flip and 1 heads
  expect(
    getByText("Out of 1 flips, there have been 1 heads and 0 tails.")
  ).toBeInTheDocument();
})

it("show coin and count for tails", function() {
    const { getByText, queryByAltText } = render(<Coin />);
    const button = getByText("Flip");
  
    // flips to heads then tails
    fireEvent.click(button);
    fireEvent.click(button);
  
    //expect first image to show heads
    expect(queryByAltText("heads")).not.toBeInTheDocument();
    expect(queryByAltText("tails")).toBeInTheDocument();
    // expect phrase to have 2 flip and 1 heads and 1 tails
    expect(
      getByText("Out of 2 flips, there have been 1 heads and 1 tails.")
    ).toBeInTheDocument();
  })

afterEach(function() {
    Math.random.mockRestore();
  });