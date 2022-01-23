import { useHistory } from "react-router-dom";
import { deleteNletter } from "../api/nletter";

const NlDelete = ({token, nlId}) => {
    const history = useHistory();
    const handleClick = async() => {
        if(!window.confirm("are you shure? to delete this newsletter with all details?"))return;
        nlId && await deleteNletter(token, nlId);
        history.push("/"); 
    }
    return <button onClick={handleClick} className="btn btn-danger"><i className="fa fa-trash"></i></button>;
}
export default NlDelete;