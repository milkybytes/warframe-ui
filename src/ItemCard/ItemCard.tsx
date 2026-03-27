import styles from './ItemCard.module.css';

export interface ItemCardProps {
  className?: string;
  label?: string;
  imgSrc?: string;
  fallbackSrc?: string;
  onClick?: () => void;
  selected?: boolean;
}

const ItemCard = ({ className = '', label, imgSrc, fallbackSrc, onClick, selected = false, ...rest }: ItemCardProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (onClick) onClick();
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (fallbackSrc) {
      e.currentTarget.src = fallbackSrc;
    }
  };

  return (
    <div className={styles.itemCardWrapper}>
      <div
        className={`${styles.itemCard} ${className}`}
        onClick={handleClick}
        data-selected={selected ? 'true' : 'false'}
        {...rest}
      >
        {label && <span className={styles.itemLabel}>{label}</span>}
        <div className={styles.imageWrapper}>
          <img
            src={imgSrc || fallbackSrc}
            alt={label || 'Item'}
            className={styles.itemImage}
            onError={handleImageError}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
