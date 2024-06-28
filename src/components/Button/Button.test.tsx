import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe('Button', () => {
  it('renders a button', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me'})).toBeInTheDocument();
  });

  it('renders a button with a custom class name', () => {
    render(<Button className="bg-red-500">Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me'})).toHaveClass('bg-red-500');
  })
});