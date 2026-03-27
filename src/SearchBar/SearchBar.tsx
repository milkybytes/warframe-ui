import Input from '../Input/Input';
import SearchIcon from '../icons/SearchIcon';
import styles from './SearchBar.module.css';

export interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  resultCount?: number;
  resultLabel?: string;
  className?: string;
}

const SearchBar = ({
  placeholder = 'Search...',
  value,
  onChange,
  onClear,
  resultCount,
  resultLabel = 'items',
  className,
}: SearchBarProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  return (
    <div className={`${styles.searchContainer} ${className || ''}`}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        showClear
        onClear={handleClear}
        icon={!value ? <SearchIcon size={20} /> : undefined}
      />
      {resultCount !== undefined && (
        <div className={styles.resultCount}>
          Displaying {resultCount} {resultLabel}.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
