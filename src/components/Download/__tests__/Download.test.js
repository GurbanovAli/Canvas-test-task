import React from 'react';
import { render } from '@testing-library/react';
import Download from '../Download';
import Control from '../../ControlFile';

test('<Download /> spec', () => {
    const { container } = render(
      <Control>
        <Download />
      </Control>
    );
    expect(container).toMatchSnapshot();
  });
