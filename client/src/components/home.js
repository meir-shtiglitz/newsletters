import AllNletters from "./allNletters";
import InviteAddNl from "./inviteAddNl";
import Contact from "./contact";

const Home = () => {

    return(
        <>
            <InviteAddNl />
            <AllNletters />{/* with about */}
            <Contact />
        </>
    )
}
export default Home;