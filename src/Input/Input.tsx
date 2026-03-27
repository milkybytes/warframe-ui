import styles from './Input.module.css';

export type InputVariant = 'default' | 'surface' | 'error' | 'success' | 'warning' | 'info';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  icon?: React.ReactNode;
  onClear?: () => void;
  showClear?: boolean;
}

const Input = ({ variant = 'default', icon, onClear, showClear = false, value, ...rest }: InputProps) => {
  const shouldShowClear = showClear && onClear && value;
  const hasRightContent = icon || shouldShowClear;

  return (
    <div className={styles.inputWrapper}>
      <input
        className={`${styles.input} ${styles[variant]} ${hasRightContent ? styles.hasIcon : ''}`}
        value={value}
        {...rest}
      />
      {icon && <span className={styles.inputIcon}>{icon}</span>}
      {shouldShowClear && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={onClear}
          aria-label="Clear input"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Input;
