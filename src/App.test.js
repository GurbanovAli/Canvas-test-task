import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('./file.worker.js');

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  expect(container).toMatchSnapshot();
});


// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
