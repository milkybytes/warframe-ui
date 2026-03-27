import { useState } from 'react';
import styles from '../App.module.css';
import { ToggleButton } from '@milkybytes/warframe-ui';
import Code from './Code';

export default function ToggleButtonExample() {
  const [checked, setChecked] = useState(false);
  const [toggle, setToggle] = useState(false);

  return (
    <section id="toggle-button" className={styles.section}>
      <h2 className={styles.sectionTitle}>ToggleButton</h2>
      <p className={styles.sectionDesc}>
        Toggle switch with default (icon) and labelled variants.
      </p>
      <div className={styles.example}>
        <div className={styles.preview}>
          <div className={styles.row}>
            <div>
              <ToggleButton checked={checked} onChange={setChecked} />
              <p className={styles.caption}>Default: {checked ? 'ON' : 'OFF'}</p>
            </div>
            <div>
              <ToggleButton
                checked={toggle}
                onChange={setToggle}
                leftLabel="A"
                rightLabel="B"
              />
              <p className={styles.caption}>Labelled: {toggle ? 'B' : 'A'}</p>
            </div>
          </div>
        </div>
        <Code>{`import { ToggleButton } from '@milkybytes/warframe-ui';

const [checked, setChecked] = useState(false);

<ToggleButton checked={checked} onChange={setChecked} />

<ToggleButton
  checked={checked}
  onChange={setChecked}
  leftLabel="A"
  rightLabel="B"
/>`}</Code>
      </div>
    </section>
  );
}
