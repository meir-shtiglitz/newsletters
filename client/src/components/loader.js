import "../css/loader.css"
const Loader = ({text="loading"}) => {

    return(
        <>
            <div className="wrap-loader">
                <div className="loader">
                {text.split('').map((letter,index) => <span key={index}>{letter}</span>)}
                </div>
            </div>
        </>
    )
}

export default Loader;