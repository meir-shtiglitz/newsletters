const Inputs = ({name,value, label=name, change, area, type="text", multiple=false, autoFocus=false}) => {
    if (area) return (
        <div className="form-group">
            <label>{label}:
                <textarea type={type} name={name} rows={4} cols="22" onInput={(e)=>change(e)} value={value} className="form-control"></textarea>
            </label>
        </div>
    )
    return(
        <div className="form-group">
            <label>{label}:
                <input type={type} name={name} onInput={(e)=>change(e)} autoFocus={autoFocus} value={value} multiple={multiple} className="form-control" />
            </label>
        </div>
    )
}
export default Inputs;