import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button = ({ children, className, variant = 'primary', ...rest }: ButtonProps) => {
  return (
    <button className={className ? `${styles.button} ${className}` : styles.button} {...rest}>
      <span className={`${styles.border} ${styles.bottom}`} />
      {children}
    </button>
  );
};

export default Button;
