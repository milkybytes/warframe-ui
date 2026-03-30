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
                Active theme: <strong style={{ color: vars['--wfui-accent'] }}>{theme}</strong>
            </p>
            <div className={styles.row}>
                {[...BUILTIN_THEMES, 'custom example'].map((t) => (
                    <Button key={t} onClick={() => setTheme(t)}>
                        {t}
                    </Button>
                ))}
            </div>
            <Input placeholder="Themed input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <table style={{ borderCollapse: 'collapse', width: 'fit-content', background: vars['--wfui-surface'], borderRadius: 6, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                <thead>
                    <tr style={{ background: vars['--wfui-surface-alt'], borderBottom: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                        <th className={styles.caption} style={{ textAlign: 'left', padding: '0.3rem 0.5rem', fontWeight: 600 }}>Swatch</th>
                        <th className={styles.caption} style={{ textAlign: 'left', padding: '0.3rem 0.5rem', fontWeight: 600 }}>Variable</th>
                        <th className={styles.caption} style={{ textAlign: 'left', padding: '0.3rem 0.5rem', fontWeight: 600 }}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {['--wfui-bg', '--wfui-text', '--wfui-accent', '--wfui-surface', '--wfui-text-interactive'].map((k, i) => (
                        <tr key={k} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <td style={{ padding: '0.2rem 0.5rem' }}>
                                <div
                                    style={{
                                        width: 18,
                                        height: 18,
                                        borderRadius: 3,
                                        backgroundColor: vars[k] || 'transparent',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                    }}
                                />
                            </td>
                            <td className={styles.caption} style={{ padding: '0.2rem 0.5rem' }}>{k}</td>
                            <td className={styles.caption} style={{ padding: '0.2rem 0.5rem', fontFamily: 'monospace' }}>{vars[k]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/* ── Register a custom "custom example" theme so the demo can switch to it ─ */
registerTheme('custom example', {
    '--wfui-bg': '#0a1628',
    '--wfui-text': '#b0d4f1',
    '--wfui-surface': '#0f2035',
    '--wfui-accent': '#36a3d9',
    '--wfui-text-interactive': '#7ec8e3',
});

export default function ThemingExample({ theme, onThemeChange }: { theme: string; onThemeChange: (t: string) => void }) {
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
                    <WfuiProvider theme={theme} onThemeChange={onThemeChange}>
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
    <div style={{ color: vars['--wfui-accent'] }}>
      Primary color: {vars['--wfui-accent']}
    </div>
  );
}`}</Code>
            </div>

            <h3 className={styles.subTitle}>Custom Theme (registerTheme)</h3>
            <div className={styles.example} style={{ flexDirection: 'column' }}>
                <div className={styles.preview}>
                    <p className={styles.sectionDesc} style={{ marginBottom: 0 }}>
                        Click <strong>Custom</strong> button above to see the custom theme in action.
                    </p>
                </div>
                <Code>{`import { registerTheme } from '@milkybytes/warframe-ui';
import type { WfuiThemeVars } from '@milkybytes/warframe-ui';

// Register once (e.g. at app startup)
// surface-alt is auto-derived from surface + bg
registerTheme('custom example', {
  '--wfui-bg': '#0a1628',
  '--wfui-text': '#b0d4f1',
  '--wfui-surface': '#0f2035',
  '--wfui-accent': '#36a3d9',
  '--wfui-text-interactive': '#7ec8e3',
});

// Then activate via data-theme or the hook:
const { setTheme } = useWfuiTheme();
setTheme('custom example');`}</Code>
            </div>
        </section>
    );
}
