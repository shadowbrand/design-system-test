import * as React from 'react';

export interface CardProps {
  /** Heading text (rendered with the Heading type style). */
  title?: string;
  /** Body copy (rendered with the Body type style). */
  body?: string;
  /** Call-to-action button label. Omit to hide the button. */
  cta?: string;
  /** Click handler for the CTA button. */
  onCtaClick?: () => void;
}

export declare function Card(props: CardProps): React.JSX.Element;

export interface ButtonProps {
  /** Button label. */
  children?: React.ReactNode;
  /** Click handler. */
  onClick?: () => void;
  /** Disabled state (muted background, no hover/click). */
  disabled?: boolean;
  /** Native button type. Defaults to "button". */
  type?: 'button' | 'submit' | 'reset';
}

export declare function Button(props: ButtonProps): React.JSX.Element;
