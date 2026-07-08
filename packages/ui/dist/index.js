// src/Button.tsx
import { jsx } from "react/jsx-runtime";
function Button({ children, onClick, disabled = false, type = "button" }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: "ds-button text-body",
      type,
      onClick,
      disabled,
      children
    }
  );
}

// src/Card.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function Card({
  title = "Card Title",
  body = "Card body text.",
  cta = "Card CTA",
  onCtaClick
}) {
  return /* @__PURE__ */ jsxs("article", { className: "ds-card", children: [
    /* @__PURE__ */ jsx2("header", { className: "ds-card__header", children: /* @__PURE__ */ jsx2("h3", { className: "ds-card__title text-heading", children: title }) }),
    /* @__PURE__ */ jsx2("p", { className: "ds-card__body text-body", children: body }),
    /* @__PURE__ */ jsx2("footer", { className: "ds-card__footer", children: /* @__PURE__ */ jsx2(Button, { onClick: onCtaClick, children: cta }) })
  ] });
}
export {
  Button,
  Card
};
