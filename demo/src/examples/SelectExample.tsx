import { useState } from 'react';
import styles from '../App.module.css';
import { Select } from '@milkybytes/warframe-ui';
import Code from './Code';

const options = [
  { value: 'excalibur', label: 'Excalibur' },
  { value: 'mag', label: 'Mag' },
  { value: 'volt', label: 'Volt' },
  { value: 'rhino', label: 'Rhino' },
  { value: 'trinity', label: 'Trinity' },
];

export default function SelectExample() {
  const [value, setValue] = useState('excalibur');

  return (
    <section id="select" className={styles.section}>
      <h2 className={styles.sectionTitle}>Select</h2>
      <p className={styles.sectionDesc}>
        Custom dropdown select with keyboard navigation.
      </p>
      <div className={styles.example}>
        <div className={styles.preview}>
          <Select
            options={options}
            value={value}
            onChange={(v) => setValue(v)}
            placeholder="Choose a warframe..."
          />
        </div>
        <Code>{`import { Select } from '@milkybytes/warframe-ui';

const options = [
  { value: 'excalibur', label: 'Excalibur' },
  { value: 'mag', label: 'Mag' },
  { value: 'volt', label: 'Volt' },
  { value: 'rhino', label: 'Rhino' },
  { value: 'trinity', label: 'Trinity' },
];

const [value, setValue] = useState('excalibur');

<Select
  options={options}
  value={value}
  onChange={(v) => setValue(v)}
  placeholder="Choose a warframe..."
/>`}</Code>
      </div>
    </section>
  );
}
