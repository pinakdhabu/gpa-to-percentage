import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders CGPA calculator', () => {
  render(<App />);
  const titleElement = screen.getByText(/SPPU CGPA to Percentage Calculator/i);
  expect(titleElement).toBeInTheDocument();
});
