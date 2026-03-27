import { useState } from 'react';
import styles from '../App.module.css';
import { ItemCard } from '@milkybytes/warframe-ui';
import Code from './Code';

const warframes = [
  { id: 'excalibur', name: 'Excalibur', image: './images/excalibur.png' },
  { id: 'mag', name: 'Mag', image: './images/mag.png' },
  { id: 'volt', name: 'Volt', image: './images/volt.png' },
  { id: 'rhino', name: 'Rhino', image: './images/rhino.png' },
  { id: 'trinity', name: 'Trinity', image: './images/trinity.png' },
  { id: 'frost', name: 'Frost', image: './images/frost.png' },
  { id: 'ember', name: 'Ember', image: './images/ember.png' },
  { id: 'loki', name: 'Loki', image: './images/loki.png' },
];

export default function ItemCardExample() {
  const [selected, setSelected] = useState<string | null>('excalibur');

  return (
    <section id="item-card" className={styles.section}>
      <h2 className={styles.sectionTitle}>ItemCard</h2>
      <p className={styles.sectionDesc}>
        Selectable item card with glow effect and corner indicator.
      </p>
      <div className={styles.example}>
        <div className={styles.preview}>
          <div className={styles.grid}>
            {warframes.map((wf) => (
              <ItemCard
                key={wf.id}
                label={wf.name}
                imgSrc={wf.image}
                selected={selected === wf.id}
                onClick={() => setSelected(wf.id)}
              />
            ))}
          </div>
        </div>
        <Code>{`import { ItemCard } from '@milkybytes/warframe-ui';

const warframes = [
  { id: 'excalibur', name: 'Excalibur', image: './images/excalibur.png' },
  { id: 'mag', name: 'Mag', image: './images/mag.png' },
  { id: 'volt', name: 'Volt', image: './images/volt.png' },
  { id: 'rhino', name: 'Rhino', image: './images/rhino.png' },
];

const [selected, setSelected] = useState('excalibur');

{warframes.map((wf) => (
  <ItemCard
    key={wf.id}
    label={wf.name}
    imgSrc={wf.image}
    selected={selected === wf.id}
    onClick={() => setSelected(wf.id)}
  />
))}`}</Code>
      </div>
    </section>
  );
}
