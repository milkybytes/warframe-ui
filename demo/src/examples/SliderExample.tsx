import { useState } from 'react';
import styles from '../App.module.css';
import { Slider } from '@milkybytes/warframe-ui';
import Code from './Code';

export default function SliderExample() {
  const [value, setValue] = useState(50);

  return (
    <section id="slider" className={styles.section}>
      <h2 className={styles.sectionTitle}>Slider</h2>
      <p className={styles.sectionDesc}>
        Range slider with Warframe bracket styling.
      </p>
      <div className={styles.example}>
        <div className={styles.preview}>
          <Slider
            label="Opacity"
            value={value}
            min={0}
            max={100}
            onChange={(v) => setValue(v)}
          />
        </div>
        <Code>{`import { Slider } from '@milkybytes/warframe-ui';

const [value, setValue] = useState(50);

<Slider
  label="Opacity"
  value={value}
  min={0}
  max={100}
  onChange={(v) => setValue(v)}
/>`}</Code>
      </div>
    </section>
  );
}
