import React from 'react';
import styles from './SVGIcon.module.css';

export interface SVGIconProps {
  children?: React.ReactNode;
  disabled?: boolean;
  fill?: string;
  className?: string;
  size?: number;
  [key: string]: any;
}

const SVGIcon = ({ children, disabled = false, fill, className, size, ...props }: SVGIconProps) => {
  const style = {
    ...(fill && { fill }),
    ...(size && { width: `${size}px`, height: `${size}px` }),
  };

  return (
    <svg
      className={`${styles.SVGIcon} ${className || ''}`}
      data-disabled={disabled}
      style={style}
      {...props}
    >
      {children}
    </svg>
  );
};

export default SVGIcon;
