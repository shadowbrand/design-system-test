// Card — a component built ENTIRELY on @shadowbrand/tokens.
// Structure (header → body → footer action) lives here; every colour, space, and
// type style comes from the token package via the classes in ui.css. This is the
// layer tokens can't give you: a shared, versioned component with a fixed layout.

import { Button } from './Button.js';

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

export function Card({ title, body, cta, onCtaClick }: CardProps) {
  return (
    <article className="dst-card">
      {title && (
        <header className="dst-card__header">
          <h3 className="dst-card__title text-heading">{title}</h3>
        </header>
      )}
      {body && <p className="dst-card__body text-body">{body}</p>}
      {cta && (
        <footer className="dst-card__footer">
          <Button onClick={onCtaClick}>{cta}</Button>
        </footer>
      )}
    </article>
  );
}
