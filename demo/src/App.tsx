import { useState } from 'react';
import styles from './App.module.css';

import ButtonExample from './examples/ButtonExample';
import InputExample from './examples/InputExample';
import TextAreaExample from './examples/TextAreaExample';
import SelectExample from './examples/SelectExample';
import SearchBarExample from './examples/SearchBarExample';
import SliderExample from './examples/SliderExample';
import ToggleButtonExample from './examples/ToggleButtonExample';
import ColorPickerExample from './examples/ColorPickerExample';
import ColorMenuExample from './examples/ColorMenuExample';
import ItemCardExample from './examples/ItemCardExample';
import ThemingExample from './examples/ThemingExample';

const SECTIONS = [
  { id: 'button', label: 'Button' },
  { id: 'input', label: 'Input' },
  { id: 'textarea', label: 'TextArea' },
  { id: 'select', label: 'Select' },
  { id: 'search-bar', label: 'SearchBar' },
  { id: 'slider', label: 'Slider' },
  { id: 'toggle-button', label: 'ToggleButton' },
  { id: 'color-picker', label: 'ColorPicker' },
  { id: 'color-menu', label: 'ColorMenu' },
  { id: 'item-card', label: 'ItemCard' },
  { id: 'theming', label: 'Theming' },
] as const;

export default function App() {
  const [theme, setTheme] = useState<string>('default');

  return (
    <div className={styles.layout} data-theme={theme}>
      <nav className={styles.nav}>
        <span className={styles.navTitle}>Components</span>
        {SECTIONS.map(({ id, label }) => (
          <a key={id} href={`#${id}`} className={styles.navLink}>
            {label}
          </a>
        ))}
      </nav>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>@milkybytes/warframe-ui</h1>
          <p className={styles.subtitle}>
            Warframe-themed React UI component library with built-in themes.
          </p>
          <div className={styles.badges}>
            <a href="https://github.com/milkybytes/warframe-ui/actions/workflows/main.yml" target="_blank" rel="noreferrer">
              <img src="https://github.com/milkybytes/warframe-ui/actions/workflows/main.yml/badge.svg" alt="Deploy Demo" />
            </a>
            <a href="https://www.npmjs.com/package/@milkybytes/warframe-ui" target="_blank" rel="noreferrer">
              <img src="https://img.shields.io/npm/v/@milkybytes/warframe-ui" alt="npm" />
            </a>
            <a href="https://github.com/milkybytes/warframe-ui/blob/main/LICENSE" target="_blank" rel="noreferrer">
              <img src="https://img.shields.io/github/license/milkybytes/warframe-ui" alt="license" />
            </a>
          </div>
        </header>

        <ButtonExample />
        <InputExample />
        <TextAreaExample />
        <SelectExample />
        <SearchBarExample />
        <SliderExample />
        <ToggleButtonExample />
        <ColorPickerExample />
        <ColorMenuExample />
        <ItemCardExample />
        <ThemingExample theme={theme} onThemeChange={setTheme} />

        <footer className={styles.footer}>MIT License</footer>
      </main>
    </div>
  );
}
