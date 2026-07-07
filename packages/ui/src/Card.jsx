// Card — a component built ENTIRELY on @shadowbrand/tokens.
// Structure (title → status → body → CTA) lives here; every colour, space, and
// type style comes from the token package via the classes in ui.css. This is the
// layer tokens can't give you: a shared, versioned component with a fixed layout.

export function Card({ title, status, body, cta, onCtaClick }) {
  return (
    <section className="dst-card">
      {title && <h3 className="dst-card__title text-heading">{title}</h3>}
      {status && <span className="dst-card__status">{status}</span>}
      {body && <p className="dst-card__body text-body">{body}</p>}
      {cta && (
        <button className="dst-card__cta" type="button" onClick={onCtaClick}>
          {cta}
        </button>
      )}
    </section>
  );
}
