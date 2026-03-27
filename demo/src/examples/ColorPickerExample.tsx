import { useState } from 'react';
import styles from '../App.module.css';
import { ColorPicker } from '@milkybytes/warframe-ui';
import Code from './Code';

const colors = ['#7c83d4', '#e94560', '#4ecca3', '#f9a825', '#7ec8e3', '#c77dff'];

export default function ColorPickerExample() {
  const [selected, setSelected] = useState('#7c83d4');
  const [squareSelected, setSquareSelected] = useState<string | undefined>('#e94560');

  return (
    <section id="color-picker" className={styles.section}>
      <h2 className={styles.sectionTitle}>ColorPicker</h2>
      <p className={styles.sectionDesc}>
        Color swatch picker with active highlight. Supports rectangle (default) and square variants,
        and shows a checkerboard pattern when no color is set.
      </p>

      <h3 className={styles.subTitle}>Default (rectangle)</h3>
      <div className={styles.example}>
        <div className={styles.preview}>
          <div className={styles.row}>
            {colors.map((c) => (
              <ColorPicker
                key={c}
                color={c}
                active={selected === c}
                onClick={() => setSelected(c)}
              />
            ))}
          </div>
          <p className={styles.caption}>Selected: {selected}</p>
        </div>
        <Code>{`import { ColorPicker } from '@milkybytes/warframe-ui';

const colors = ['#7c83d4', '#e94560', '#4ecca3'];
const [selected, setSelected] = useState('#7c83d4');

{colors.map((c) => (
  <ColorPicker
    key={c}
    color={c}
    active={selected === c}
    onClick={() => setSelected(c)}
  />
))}`}</Code>
      </div>

      <h3 className={styles.subTitle}>Square</h3>
      <div className={styles.example}>
        <div className={styles.preview}>
          <div className={styles.row}>
            {colors.map((c) => (
              <ColorPicker
                key={c}
                square
                color={c}
                active={squareSelected === c}
                onClick={() => setSquareSelected(c)}
              />
            ))}
          </div>
        </div>
        <Code>{`<ColorPicker square color="#7c83d4" active onClick={...} />`}</Code>
      </div>

      <h3 className={styles.subTitle}>Empty (checkerboard)</h3>
      <div className={styles.example}>
        <div className={styles.preview}>
          <div className={styles.row}>
            <ColorPicker onClick={() => {}} />
            <ColorPicker square onClick={() => {}} />
          </div>
        </div>
        <Code>{`// No color prop renders checkerboard placeholder
<ColorPicker onClick={handleClick} />
<ColorPicker square onClick={handleClick} />`}</Code>
      </div>
    </section>
  );
}
