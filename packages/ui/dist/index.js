// src/Button.tsx
import { jsx } from "react/jsx-runtime";
function Button({ children, onClick, disabled = false, type = "button" }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: "dst-button text-body",
      type,
      onClick,
      disabled,
      children
    }
  );
}

// src/Card.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function Card({ title, body, cta, onCtaClick }) {
  return /* @__PURE__ */ jsxs("article", { className: "dst-card", children: [
    title && /* @__PURE__ */ jsx2("header", { className: "dst-card__header", children: /* @__PURE__ */ jsx2("h3", { className: "dst-card__title text-heading", children: title }) }),
    body && /* @__PURE__ */ jsx2("p", { className: "dst-card__body text-body", children: body }),
    cta && /* @__PURE__ */ jsx2("footer", { className: "dst-card__footer", children: /* @__PURE__ */ jsx2(Button, { onClick: onCtaClick, children: cta }) })
  ] });
}
export {
  Button,
  Card
};
