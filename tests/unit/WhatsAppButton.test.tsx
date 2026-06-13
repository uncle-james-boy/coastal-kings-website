import { render, screen } from '@testing-library/react';
import WhatsAppButton from '@/components/WhatsAppButton';

describe('WhatsAppButton', () => {
  it('renders correctly', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link'); // CHANGED: 'button' → 'link'
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('💬 Chat With Us');
  });

  it('has correct WhatsApp href', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link');
    
    expect(link).toHaveAttribute('href', expect.stringContaining('wa.me/27772773392'));
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('opens in new tab', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link');
    
    expect(link).toHaveAttribute('target', '_blank');
  });
});