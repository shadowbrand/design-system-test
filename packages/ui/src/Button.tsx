// Button — a component built ENTIRELY on @shadowbrand/tokens.
// Every colour, space, and type value reads a token via the class in ui.css.
// Card uses this for its CTA; it also stands alone.

import type { ReactNode } from 'react';

export interface ButtonProps {
  /** Button label. */
  children?: ReactNode;
  /** Click handler. */
  onClick?: () => void;
  /** Disabled state: muted background, no hover, not clickable. Defaults to false. */
  disabled?: boolean;
  /** Native button type. Defaults to "button". */
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ children, onClick, disabled = false, type = 'button' }: ButtonProps) {
  return (
    <button
      className="dst-button text-body"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
