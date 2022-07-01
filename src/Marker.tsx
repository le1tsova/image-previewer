interface IProps {
  coordX: number;
  coordY: number;
  text: string;
}

const Marker: React.FC<IProps> = ({ coordX, coordY, text }) => {
  const markerStyle = {
    left: coordX,
    top: coordY,
  };

  return (
    <div className="marker" style={markerStyle}>
      {text}
    </div>
  );
};

export default Marker;
