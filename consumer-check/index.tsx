// A realistic consumer: import by package name (exercises the exports map and the
// barrel's per-component .d.ts re-exports) and use the props (exercises the types).
// tsc fails here if the .d.ts don't resolve or a prop type is wrong.
import { Card, Button, type CardProps, type ButtonProps } from "@shadowbrand/ui";

const card: CardProps = { title: "Hi", body: "…", cta: "Go", onCtaClick: () => {} };
const button: ButtonProps = { children: "Go", disabled: true, type: "submit" };

export function App() {
  return (
    <>
      <Card {...card} />
      <Button {...button} />
    </>
  );
}
