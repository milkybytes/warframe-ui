import styles from './ColorMenu.module.css';

export interface ColorMenuProps {
  colors: string[];
  columns?: number;
  selectedIndex?: number;
  onSelect?: (color: string, index: number) => void;
  className?: string;
}

const ColorMenu = ({
  colors,
  columns = 5,
  selectedIndex,
  onSelect,
  className,
}: ColorMenuProps) => {
  const normalizeHex = (hex: string) => (hex.startsWith('#') ? hex : `#${hex}`);

  return (
    <div className={`${styles.colorMenu} ${className || ''}`}>
      <div
        className={styles.colorGrid}
        style={{ '--wfui-color-menu-columns': columns } as React.CSSProperties}
      >
        {colors.map((hex, index) => (
          <div
            key={`${index}-${hex}`}
            className={styles.colorCell}
            style={{ backgroundColor: normalizeHex(hex) }}
            data-selected={selectedIndex === index ? 'true' : undefined}
            onClick={() => onSelect?.(normalizeHex(hex), index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorMenu;
