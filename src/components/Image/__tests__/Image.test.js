import React from 'react';
import { render } from '@testing-library/react';
import Image from '../Image';
import Control from '../../ControlFile';


test('<Image /> spec', () => {
    const { container } = render(
      <Control>
        <Image />
      </Control>
    );
    expect(container).toMatchSnapshot();
  });
