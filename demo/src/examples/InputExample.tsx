import { useState } from 'react';
import styles from '../App.module.css';
import { Input } from '@milkybytes/warframe-ui';
import Code from './Code';

export default function InputExample() {
  const [value, setValue] = useState('');

  return (
    <section id="input" className={styles.section}>
      <h2 className={styles.sectionTitle}>Input</h2>
      <p className={styles.sectionDesc}>
        Text input with optional icon and clear button.
      </p>
      <div className={styles.example}>
        <div className={styles.preview}>
          <Input
            placeholder="Type something..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            showClear
            onClear={() => setValue('')}
          />
        </div>
        <Code>{`import { Input } from '@milkybytes/warframe-ui';

const [value, setValue] = useState('');

<Input
  placeholder="Type something..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  showClear
  onClear={() => setValue('')}
/>`}</Code>
      </div>
    </section>
  );
}
