import { LeftBracketIcon, RightBracketIcon } from '../icons/BracketIcon';
import styles from './Slider.module.css';

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

const Slider = ({ value, onChange, min = 0, max = 1, step = 0.01, disabled = false, className }: SliderProps) => {
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = parseFloat((e.target as HTMLInputElement).value);
    if (!isNaN(newValue)) onChange(newValue);
  };

  const formatValue = (val: number) => {
    if (step >= 1) return val.toString();
    const decimals = step >= 0.1 ? 1 : 2;
    return parseFloat(val.toFixed(decimals)).toString();
  };

  return (
    <div className={`${styles.sliderRow} ${className || ''}`}>
      <LeftBracketIcon className={styles.bracketIcon} />
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onInput={handleInput}
          onChange={handleInput}
          disabled={disabled}
          className={styles.sliderInput}
          style={{
            background: `linear-gradient(to right, var(--wfui-text-secondary) 0%, var(--wfui-text-secondary) ${((value - min) / (max - min)) * 100}%, var(--wfui-secondary) ${((value - min) / (max - min)) * 100}%, var(--wfui-secondary) 100%)`,
          }}
        />
      </div>
      <RightBracketIcon className={styles.bracketIcon} />
      <span className={styles.value}>{formatValue(value)}</span>
    </div>
  );
};

export default Slider;
