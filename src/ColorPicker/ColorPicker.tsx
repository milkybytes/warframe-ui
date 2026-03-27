import { useEffect, useRef, useState } from 'react';
import styles from './ColorPicker.module.css';

export interface ColorPickerProps {
  square?: boolean;
  color?: string;
  imageSrc?: string;
  active?: boolean;
  title?: string;
  onClick?: () => void;
  className?: string;
}

const ColorPicker = ({ color, imageSrc, square, active, title, onClick, className }: ColorPickerProps) => {
  const [extractedColor, setExtractedColor] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!imageSrc) {
      setExtractedColor(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let r = 0, g = 0, b = 0, count = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 0) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
      }

      if (count > 0) {
        setExtractedColor(`rgb(${Math.round(r / count)}, ${Math.round(g / count)}, ${Math.round(b / count)})`);
      }
    };

    img.onerror = () => setExtractedColor(null);
  }, [imageSrc]);

  const displayColor = extractedColor || color;

  return (
    <div className={className || ''}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div
        className={`${styles.colorPicker} ${active ? styles.active : ''} ${!displayColor ? styles.checkerboard : ''} ${square ? styles.square : ''}`}
        style={{ backgroundColor: displayColor || 'transparent' }}
        title={title || 'Click to change color'}
        onClick={() => onClick?.()}
      />
    </div>
  );
};

export default ColorPicker;
