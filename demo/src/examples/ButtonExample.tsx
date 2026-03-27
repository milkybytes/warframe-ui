import styles from '../App.module.css';
import { Button } from '@milkybytes/warframe-ui';
import Code from './Code';

export default function ButtonExample() {
  return (
    <section id="button" className={styles.section}>
      <h2 className={styles.sectionTitle}>Button</h2>
      <p className={styles.sectionDesc}>
        Primary action button with glow hover effect and bottom border animation.
      </p>
      <div className={styles.example}>
        <div className={styles.preview}>
          <div className={styles.row}>
            <Button onClick={() => alert('Clicked!')}>Primary</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
        <Code>{`import { Button } from '@milkybytes/warframe-ui';

<Button onClick={() => alert('Clicked!')}>Primary</Button>
<Button disabled>Disabled</Button>`}</Code>
      </div>
    </section>
  );
}
