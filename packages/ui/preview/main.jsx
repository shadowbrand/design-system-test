// Preview gallery. Imports components from source (live-edited) and the local
// built token CSS, so what you see reflects the current repo, not a published
// version. Add a component here to exercise it before publishing.
import { createRoot } from 'react-dom/client';
import { Card, Button } from '../src/index.js';
import '../../tokens/tokens.css';
import '../src/ui.css';

const section = { display: 'grid', gap: 16 };
const row = { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' };

function App() {
  return (
    <div style={{ padding: 32, display: 'grid', gap: 40, maxWidth: 520 }}>
      <section style={section}>
        <h2 className="text-heading">Card</h2>
        <Card
          title="Request card"
          body="Composed from tokens — nothing hard-codes a colour or a gap."
          cta="Review request"
          onCtaClick={() => alert('CTA clicked')}
        />
      </section>

      <section style={section}>
        <h2 className="text-heading">Button</h2>
        <div style={row}>
          <Button onClick={() => alert('clicked')}>Default</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
