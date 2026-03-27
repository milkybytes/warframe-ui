import MenuIcon from '../icons/MenuIcon';
import CheckIcon from '../icons/CheckIcon';
import CloseIcon from '../icons/CloseIcon';
import styles from './ToggleButton.module.css';

export interface ToggleButtonProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    leftLabel?: string;
    rightLabel?: string;
}

const ToggleButton = ({
    checked,
    onChange,
    disabled = false,
    leftLabel,
    rightLabel,
}: ToggleButtonProps) => {
    if (leftLabel || rightLabel) {
        return (
            <button
                className={`${styles.toggleButton} ${checked ? styles.checked : ''}`}
                onClick={() => !disabled && onChange(!checked)}
                disabled={disabled}
                type="button"
                aria-pressed={checked}
            >
                <span className={`${styles.labelledToggle} ${!checked ? styles.active : ''}`}>
                    {leftLabel}
                </span>
                <span className={`${styles.labelledToggle} ${checked ? styles.active : ''}`}>
                    {rightLabel}
                </span>
            </button>
        );
    }

    return (
        <button
            className={`${styles.toggleButton} ${checked ? styles.checked : ''}`}
            onClick={() => !disabled && onChange(!checked)}
            disabled={disabled}
            type="button"
            aria-pressed={checked}
        >
            {!checked && (
                <span className={styles.iconContainer}>
                    <CloseIcon className={styles.icon} width="18" height="18" />
                </span>
            )}
            <span className={styles.barsContainer}>
                <MenuIcon className={styles.menuIcon} width="18" height="18" />
            </span>
            {checked && (
                <span className={styles.iconContainer}>
                    <CheckIcon className={styles.icon} width="18" height="18" />
                </span>
            )}
        </button>
    );
};

export default ToggleButton;
