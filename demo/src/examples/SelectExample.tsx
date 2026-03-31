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

const manyOptions = [
  { value: 'ash', label: 'Ash' },
  { value: 'banshee', label: 'Banshee' },
  { value: 'ember', label: 'Ember' },
  { value: 'frost', label: 'Frost' },
  { value: 'hydroid', label: 'Hydroid' },
  { value: 'loki', label: 'Loki' },
  { value: 'mesa', label: 'Mesa' },
  { value: 'nekros', label: 'Nekros' },
  { value: 'nova', label: 'Nova' },
  { value: 'nyx', label: 'Nyx' },
  { value: 'oberon', label: 'Oberon' },
  { value: 'saryn', label: 'Saryn' },
  { value: 'vauban', label: 'Vauban' },
  { value: 'wisp', label: 'Wisp' },
  { value: 'zephyr', label: 'Zephyr' },
];

export default function SelectExample() {
  const [value, setValue] = useState('excalibur');
  const [scrollValue, setScrollValue] = useState('ash');

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
        <Code>{`<Select
  options={options}
  value={value}
  onChange={(v) => setValue(v)}
  placeholder="Choose a warframe..."
/>`}</Code>
      </div>
      <div className={styles.example}>
        <div className={styles.preview}>
          <Select
            options={manyOptions}
            value={scrollValue}
            onChange={(v) => setScrollValue(v)}
            visibleOptions={5}
            placeholder="Choose a warframe..."
          />
        </div>
        <Code>{`<Select
  options={manyOptions}
  value={scrollValue}
  onChange={(v) => setScrollValue(v)}
  visibleOptions={5}
  placeholder="Choose a warframe..."
/>`}</Code>
      </div>
    </section>
  );
}
