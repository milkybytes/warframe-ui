import { useState } from 'react';
import styles from '../App.module.css';
import {
    WfuiProvider,
    useWfuiTheme,
    useWfuiThemeVars,
    registerTheme,
    BUILTIN_THEMES,
    Button,
    Input,
} from '@milkybytes/warframe-ui';
import Code from './Code';

/* ── A small inner component that uses the hooks ───────────────── */
function ThemeConsumer() {
    const [inputValue, setInputValue] = useState('');
    const { theme, setTheme } = useWfuiTheme();
    const vars = useWfuiThemeVars();

    return (
        <div className={styles.column} style={{ maxWidth: '100%', gap: '0.75rem' }}>
            <p className={styles.caption}>
                Active theme: <strong style={{ color: vars['--wfui-primary'] }}>{theme}</strong>
            </p>
            <div className={styles.row}>
                {[...BUILTIN_THEMES, 'corpus'].map((t) => (
                    <Button key={t} onClick={() => setTheme(t)}>
                        {t}
                    </Button>
                ))}
            </div>
            <Input placeholder="Themed input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <div className={styles.row} style={{ gap: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {['--wfui-bg', '--wfui-primary', '--wfui-surface', '--wfui-text-secondary'].map((k) => (
                    <div key={k} style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.25rem' }}>
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 4,
                                backgroundColor: vars[k] || 'transparent',
                                border: '1px solid rgba(255,255,255,0.15)',
                            }}
                        />
                        <span className={styles.caption}>{k}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── Register a custom "corpus" theme so the demo can switch to it ─ */
registerTheme('corpus', {
    '--wfui-bg': '#0a1628',
    '--wfui-text': '#b0d4f1',
    '--wfui-surface': '#0f2035',
    '--wfui-primary': '#36a3d9',
    '--wfui-secondary': '#0c1a2e',
    '--wfui-secondary-hover': '#0f2035',
    '--wfui-text-secondary': '#7ec8e3',
});

export default function ThemingExample() {
    const [controlledTheme, setControlledTheme] = useState('default');

    return (
        <section id="theming" className={styles.section}>
            <h2 className={styles.sectionTitle}>Theming</h2>
            <p className={styles.sectionDesc}>
                Components are themed via CSS variables just set <code>data-theme</code> on any
                parent element. <code>WfuiProvider</code> is an optional React convenience for
                programmatic access. All names are prefixed with <code>wfui</code> to avoid conflicts.
            </p>

            <h3 className={styles.subTitle}>CSS only (no provider needed)</h3>
            <div className={styles.example} style={{ flexDirection: 'column' }}>
                <div className={styles.preview}>
                    <p className={styles.sectionDesc} style={{ marginBottom: 0 }}>
                        The simplest approach, no React context required.
                    </p>
                </div>
                <Code>{`import '@milkybytes/warframe-ui/style.css';

// Just set data-theme on any parent element
<div data-theme="vitruvian">
  <Button>Themed button</Button>
</div>`}</Code>
            </div>

            <h3 className={styles.subTitle}>WfuiProvider + useWfuiTheme</h3>
            <div className={styles.example} style={{ flexDirection: 'column' }}>
                <div className={styles.preview}>
                    <WfuiProvider theme={controlledTheme} onThemeChange={setControlledTheme}>
                        <ThemeConsumer />
                    </WfuiProvider>
                </div>
                <Code>{`import {
  WfuiProvider,
  useWfuiTheme,
  Button,
  BUILTIN_THEMES,
} from '@milkybytes/warframe-ui';

function MyApp() {
  const [theme, setTheme] = useState('default');

  return (
    <WfuiProvider theme={theme} onThemeChange={setTheme}>
      <MyContent />
    </WfuiProvider>
  );
}

function MyContent() {
  const { theme, setTheme } = useWfuiTheme();

  return (
    <div>
      <p>Current: {theme}</p>
      {BUILTIN_THEMES.map((t) => (
        <Button key={t} onClick={() => setTheme(t)}>
          {t}
        </Button>
      ))}
    </div>
  );
}`}</Code>
            </div>

            <h3 className={styles.subTitle}>useWfuiThemeVars</h3>
            <div className={styles.example} style={{ flexDirection: 'column' }}>
                <div className={styles.preview}>
                    <p className={styles.sectionDesc} style={{ marginBottom: 0 }}>
                        Read resolved CSS variable values to use in inline styles or logic.
                    </p>
                </div>
                <Code>{`import { useWfuiThemeVars } from '@milkybytes/warframe-ui';

function MyComponent() {
  const vars = useWfuiThemeVars();

  return (
    <div style={{ color: vars['--wfui-primary'] }}>
      Primary color: {vars['--wfui-primary']}
    </div>
  );
}`}</Code>
            </div>

            <h3 className={styles.subTitle}>Custom Theme (registerTheme)</h3>
            <div className={styles.example} style={{ flexDirection: 'column' }}>
                <div className={styles.preview}>
                    <p className={styles.sectionDesc} style={{ marginBottom: 0 }}>
                        Click <strong>corpus</strong> above to see the custom theme in action.
                    </p>
                </div>
                <Code>{`import { registerTheme } from '@milkybytes/warframe-ui';
import type { WfuiThemeVars } from '@milkybytes/warframe-ui';

// Register once (e.g. at app startup)
registerTheme('corpus', {
  '--wfui-bg': '#0a1628',
  '--wfui-text': '#b0d4f1',
  '--wfui-surface': '#0f2035',
  '--wfui-primary': '#36a3d9',
  '--wfui-secondary': '#0c1a2e',
  '--wfui-secondary-hover': '#0f2035',
  '--wfui-text-secondary': '#7ec8e3',
});

// Then activate via data-theme or the hook:
const { setTheme } = useWfuiTheme();
setTheme('corpus');`}</Code>
            </div>
        </section>
    );
}
