import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('./file.worker.js');

test('<App /> spec', () => {
  const {container} = render(<App />);
  expect(container).toMatchSnapshot();
});
