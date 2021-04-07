import { render, screen } from '@testing-library/react';
import TerminalPuzzle from './App';

test('renders learn react link', () => {
  render(<TerminalPuzzle />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
