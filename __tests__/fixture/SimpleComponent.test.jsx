import React from 'react';
import { render, screen } from '@testing-library/react';
import SimpleComponent from './SimpleComponent';
describe('__tests__/fixture/SimpleComponent', () => {
  it('should render SimpleComponent', () => {
    render(<SimpleComponent />);
  });
});
