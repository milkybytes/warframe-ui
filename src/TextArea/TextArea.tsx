import styles from './TextArea.module.css';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = ({ className, ...rest }: TextAreaProps) => {
  return (
    <div className={`${styles.textareaWrapper} ${className || ''}`}>
      <textarea className={styles.textarea} {...rest} />
      <div className={styles.bottom}></div>
    </div>
  );
};

export default TextArea;
