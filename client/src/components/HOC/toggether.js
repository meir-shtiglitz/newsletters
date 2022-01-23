import InOver from "./inOver";
import WithOverlay from "./withOverlay";
const Toggether = () => {
    const Wrap = WithOverlay(InOver);
    return <Wrap />
}
export default Toggether;