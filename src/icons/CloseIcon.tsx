import SVGIcon from './SVGIcon';

const CloseIcon = ({ ...props }: any) => {
  return (
    <SVGIcon viewBox="0 -960 960 960" {...props}>
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </SVGIcon>
  );
};

export default CloseIcon;
