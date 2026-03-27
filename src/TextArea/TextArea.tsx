import styles from './TextArea.module.css';

export type TextAreaVariant = 'default' | 'surface' | 'error' | 'success' | 'warning' | 'info';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextAreaVariant;
}

const TextArea = ({ variant = 'default', className, ...rest }: TextAreaProps) => {
  return (
    <div className={`${styles.textareaWrapper} ${className || ''}`}>
      <textarea className={`${styles.textarea} ${styles[variant]}`} {...rest} />
      <div className={styles.bottom}></div>
    </div>
  );
};

export default TextArea;
