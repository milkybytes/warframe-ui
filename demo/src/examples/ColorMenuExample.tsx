import { useState } from 'react';
import styles from '../App.module.css';
import { ColorMenu } from '@milkybytes/warframe-ui';
import Code from './Code';

// Sample palette inspired by the Warframe "Classic" palette
const CLASSIC_PALETTE = [
  '#1a1a2e', '#16213e', '#0f3460', '#533483', '#e94560',
  '#2b2d42', '#8d99ae', '#edf2f4', '#ef233c', '#d90429',
  '#003049', '#d62828', '#f77f00', '#fcbf49', '#eae2b7',
  '#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51',
  '#606c38', '#283618', '#fefae0', '#dda15e', '#bc6c25',
  '#0b090a', '#161a1d', '#660708', '#a4161a', '#ba181b',
  '#e5383b', '#b1a7a6', '#d3d3d3', '#f5f3f4', '#ffffff',
  '#10002b', '#240046', '#3c096c', '#5a189a', '#7b2cbf',
  '#9d4edd', '#c77dff', '#e0aaff', '#b8c0ff', '#d0d1ff',
  '#03071e', '#370617', '#6a040f', '#9d0208', '#d00000',
  '#dc2f02', '#e85d04', '#f48c06', '#faa307', '#ffba08',
];

export default function ColorMenuExample() {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();

  return (
    <section id="color-menu" className={styles.section}>
      <h2 className={styles.sectionTitle}>ColorMenu</h2>
      <p className={styles.sectionDesc}>
        A 5-column color palette grid for selecting colors, styled after the Warframe color
        selection screen. Supports configurable column count and selected state.
      </p>
      <div className={styles.example}>
        <div className={styles.preview}>
          <ColorMenu
            colors={CLASSIC_PALETTE}
            columns={5}
            selectedIndex={selectedIndex}
            onSelect={(color, index) => {
              setSelectedColor(color);
              setSelectedIndex(index);
            }}
          />
          {selectedColor && (
            <p className={styles.caption}>Selected: {selectedColor}</p>
          )}
        </div>
        <Code>{`import { ColorMenu } from '@milkybytes/warframe-ui';

const PALETTE = [
  '#1a1a2e', '#16213e', '#0f3460', '#533483', '#e94560',
  '#2b2d42', '#8d99ae', '#edf2f4', '#ef233c', '#d90429',
  // ...more colors
];

const [selectedIndex, setSelectedIndex] = useState<number>();
const [selectedColor, setSelectedColor] = useState<string>();

<ColorMenu
  colors={PALETTE}
  columns={5}
  selectedIndex={selectedIndex}
  onSelect={(color, index) => {
    setSelectedColor(color);
    setSelectedIndex(index);
  }}
/>`}</Code>
      </div>
    </section>
  );
}
