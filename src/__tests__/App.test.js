import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

// Toppings Checkbox Tests
test("pizza checkbox is initially unchecked", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
  expect(checkbox).not.toBeChecked();
});

test("toppings list updates when checkbox is clicked", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(screen.getByText(/small pepperoni/i)).toBeInTheDocument();
});

// Size Dropdown Tests
test("size select element initially displays 'Small'", () => {
  render(<App />);
  const selectSize = screen.getByLabelText(/select size/i);
  expect(selectSize).toHaveDisplayValue("Small");
});

test("size dropdown updates when user selects new value", () => {
  render(<App />);
  const selectSize = screen.getByLabelText(/select size/i);
  userEvent.selectOptions(selectSize, "medium");
  expect(selectSize).toHaveDisplayValue("Medium");
  userEvent.selectOptions(selectSize, "large");
  expect(selectSize).toHaveDisplayValue("Large");
});

// "Your Selection" Text
test("'Your selection' initially displays 'small cheese'", () => {
  render(<App />);
  expect(screen.getByText(/small cheese/i)).toBeInTheDocument();
});

test("selection text updates when options change", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
  const selectSize = screen.getByLabelText(/select size/i);

  userEvent.click(checkbox);
  expect(screen.getByText(/small pepperoni/i)).toBeInTheDocument();

  userEvent.selectOptions(selectSize, "large");
  expect(screen.getByText(/large pepperoni/i)).toBeInTheDocument();
});

// Contact Info Input
test("contact input initially has placeholder 'email address'", () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
});

test("contact input updates as user types", () => {
  render(<App />);
  const input = screen.getByLabelText(/enter your email address/i);
  userEvent.type(input, "pizza@order.com");
  expect(input).toHaveValue("pizza@order.com");
});

// Submit Button
test("form contains a Submit Order button", () => {
  render(<App />);
  expect(
    screen.getByRole("button", { name: /submit order/i })
  ).toBeInTheDocument();
});

test("clicking submit displays thank you message", () => {
  render(<App />);
  userEvent.click(screen.getByRole("button", { name: /submit order/i }));
  expect(screen.getByText(/thanks for your order!/i)).toBeInTheDocument();
});
