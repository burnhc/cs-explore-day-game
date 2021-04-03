import { render, screen } from '@testing-library/react';
import Page1 from './App';

test('renders learn react link', () => {
  render(<Page1 />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
