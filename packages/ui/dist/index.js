// src/Card.jsx
import { jsx, jsxs } from "react/jsx-runtime";
function Card({ title, status, body, cta, onCtaClick }) {
  return /* @__PURE__ */ jsxs("section", { className: "dst-card", children: [
    title && /* @__PURE__ */ jsx("h3", { className: "dst-card__title text-heading", children: title }),
    status && /* @__PURE__ */ jsx("span", { className: "dst-card__status", children: status }),
    body && /* @__PURE__ */ jsx("p", { className: "dst-card__body text-body", children: body }),
    cta && /* @__PURE__ */ jsx("button", { className: "dst-card__cta", type: "button", onClick: onCtaClick, children: cta })
  ] });
}
export {
  Card
};
