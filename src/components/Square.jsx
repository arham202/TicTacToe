const Square = ({ value, onClick}) => {
  // console.log(value);
  return (
    <button type="button" className="square" onClick={onClick}>
      <span className={ value !== 'X' ? 'text-orange' : 'text-green'}>{value}</span>
    </button>
  );
};

export default Square;
