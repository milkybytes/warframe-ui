import { useState } from 'react';
import styles from '../App.module.css';
import { SearchBar } from '@milkybytes/warframe-ui';
import Code from './Code';

const items = ['Excalibur', 'Mag', 'Volt', 'Rhino', 'Trinity', 'Frost', 'Ember', 'Loki'];

export default function SearchBarExample() {
  const [value, setValue] = useState('');
  const matchCount = value
    ? items.filter((i) => i.toLowerCase().includes(value.toLowerCase())).length
    : undefined;

  return (
    <section id="search-bar" className={styles.section}>
      <h2 className={styles.sectionTitle}>SearchBar</h2>
      <p className={styles.sectionDesc}>
        Search input with result count display.
      </p>
      <div className={styles.example}>
        <div className={styles.preview}>
          <SearchBar
            value={value}
            onChange={setValue}
            resultCount={matchCount}
          />
        </div>
        <Code>{`import { SearchBar } from '@milkybytes/warframe-ui';

<SearchBar
  value={value}
  onChange={setValue}
  resultCount={matchCount}
/>`}</Code>
      </div>
    </section>
  );
}
