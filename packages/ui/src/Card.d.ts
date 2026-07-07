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
