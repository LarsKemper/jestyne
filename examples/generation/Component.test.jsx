import React from 'react';
import { render } from '@testing-library/react';
import Component from './Component';

describe('examples/generation', () => {
  it('should render Component', () => {
    render(<Component />);
  });
});
