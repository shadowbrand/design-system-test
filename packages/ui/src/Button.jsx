// Button — a component built ENTIRELY on @shadowbrand/tokens.
// Every colour, space, and type value reads a token via the class in ui.css.
// Card uses this for its CTA; it also stands alone.

export function Button({ children, onClick, disabled = false, type = 'button' }) {
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
