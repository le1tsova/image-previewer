interface IProps {
  coordX: number;
  coordY: number;
  text: string;
}

const Marker: React.FC<IProps> = ({ coordX, coordY, text }) => {
  let infoStyle = {
    left: coordX,
    top: coordY,
  };

  return (
    <div className="marker" style={infoStyle}>
      {text}
    </div>
  );
};

export default Marker;
