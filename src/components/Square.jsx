

const Square = ({value,children}) => {
    console.log(value);
    return (
        <button type="button" className="square">
            {value}
        </button>
    );
};

export default Square;