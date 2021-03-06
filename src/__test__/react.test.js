import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../app';
import Header from '../components/header/index';

test('loads and displays the starting app', async () => {
  render(<HTMLAllCollection />);
  const title = await waitFor(() => screen.getByTestId("title"));
  expect(title).toHaveTextContent('ToDo');
});

// test('can count', async () => {
//   render(<App />);

//   const button = screen.getByTestId('update-counter');
//   const counter = screen.getByTestId('counter-value');

//   fireEvent.click(button);
//   expect(counter).toHaveTextContent(1);
// });

// test('Does the factor value change', async () => {
//   render(<App />);

//   const button = screen.getByTestId('update-counter');
//   const factor = screen.getByTestId('factor');

//   for (let index = 0; index < 5; index++) {
//     fireEvent.click(button);

//   }
//   expect(factor).toHaveTextContent('yes');
// });