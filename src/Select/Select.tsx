import React, { useState, useRef, useEffect, useMemo } from 'react';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: SelectOption[];
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  required?: boolean;
}

const Select = ({
  value = '',
  onChange,
  options,
  children,
  className,
  disabled = false,
  placeholder = 'Select...',
  id,
  required,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const parsedOptions: SelectOption[] = useMemo(() => {
    if (options) return options;
    if (!children) return [];

    const result: SelectOption[] = [];
    React.Children.forEach(children, (child: any) => {
      if (child && child.props) {
        result.push({
          value: String(child.props.value || ''),
          label: String(child.props.children || child.props.value || ''),
        });
      }
    });
    return result;
  }, [options, children]);

  const selectedOption = parsedOptions.find((opt) => opt.value === selectedValue);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  return (
    <div className={styles.selectWrapper} ref={wrapperRef}>
      <div
        id={id}
        className={`${styles.select} ${className || ''} ${
          disabled ? styles.disabled : ''
        } ${isOpen ? styles.open : ''}`}
        onClick={handleToggle}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          } else if (e.key === 'Escape') {
            setIsOpen(false);
          }
        }}
      >
        <span className={styles.selectValue}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={styles.selectArrow}>🞃</span>
      </div>

      {isOpen && (
        <div className={styles.optionsDropdown} role="listbox">
          {parsedOptions.map((option) => (
            <div
              key={option.value}
              className={styles.option}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={option.value === selectedValue}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
