import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
 
import Login from '../components/auth/login';
 
describe("<Login />", () => {
 
  test('render email input', () => {
    render(<Login />);
 
    const inputEl = screen.getByTestId("username-input");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");
  });
 
  test('pass valid email to test email input field', () => {
    render(<Login />);
 
    const inputEl = screen.getByTestId("username-input");
    userEvent.type(inputEl, "test@mail.com");
 
    expect(screen.getByTestId("username-input")).toHaveValue("test@mail.com");
    expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
  });

  test('pass invalid email to test input value', () => {
    render(<Login />);
 
    const inputEl = screen.getByTestId("use-input");
    userEvent.type(inputEl, "test");
 
    expect(screen.getByTestId("email-input")).toHaveValue("test");
    expect(screen.queryByTestId("error-msg")).toBeInTheDocument();
    expect(screen.queryByTestId("error-msg").textContent).toEqual("Please enter a valid email.");
  });


});