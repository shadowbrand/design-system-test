// Card — a component built ENTIRELY on @shadowbrand/tokens.
// Structure (title → body → CTA) lives here; every colour, space, and type style
// comes from the token package via the classes in ui.css. This is the layer tokens
// can't give you: a shared, versioned component with a fixed layout.

import { Button } from './Button.jsx';

export function Card({ title, body, cta, onCtaClick }) {
  return (
    <article className="dst-card">
      {title && <h3 className="dst-card__title text-heading">{title}</h3>}
      {body && <p className="dst-card__body text-body">{body}</p>}
      {cta && <Button onClick={onCtaClick}>{cta}</Button>}
    </article>
  );
}
