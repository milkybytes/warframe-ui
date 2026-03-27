import { useState } from 'react';
import styles from '../App.module.css';
import { TextArea } from '@milkybytes/warframe-ui';
import Code from './Code';

export default function TextAreaExample() {
  const [value, setValue] = useState('');

  return (
    <section id="textarea" className={styles.section}>
      <h2 className={styles.sectionTitle}>TextArea</h2>
      <p className={styles.sectionDesc}>
        Multi-line text input.
      </p>
      <div className={styles.example}>
        <div className={styles.preview}>
          <TextArea
            placeholder="Type something..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <Code>{`import { TextArea } from '@milkybytes/warframe-ui';

const [value, setValue] = useState('');

<TextArea
  placeholder="Type something..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`}</Code>
      </div>
    </section>
  );
}
