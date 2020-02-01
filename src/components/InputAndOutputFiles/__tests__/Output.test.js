import React from 'react';
import { render } from '@testing-library/react';
import Output from '../Output';
import Control from '../../ControlFile';


test('<Output /> spec', () => {
    const { container } = render(
      <Control>
        <Output />
      </Control>
    );
    expect(container).toMatchSnapshot();
  });
