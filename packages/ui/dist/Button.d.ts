import * as React from 'react';

export interface ButtonProps {
  /** Button label. */
  children?: React.ReactNode;
  /** Click handler. */
  onClick?: () => void;
  /** Disabled state: muted background, no hover, not clickable. Defaults to false. */
  disabled?: boolean;
  /** Native button type. Defaults to "button". */
  type?: 'button' | 'submit' | 'reset';
}

export declare function Button(props: ButtonProps): React.JSX.Element;
