const ProgressBar = ({ bgcolor, completed, attempts }) => {
    return (
        <div className="containerStyles">
            <div className="fillerStyles" style={{ width: `${completed}%`, backgroundColor: bgcolor }}>
                <span className="labelStyles ">{attempts}</span>
            </div>
        </div>
    );
};

export default ProgressBar