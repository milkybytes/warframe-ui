import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button className={className ? `${styles.button} ${className}` : styles.button} {...rest}>
      <span className={`${styles.border} ${styles.bottom}`} />
      {children}
    </button>
  );
};

export default Button;
