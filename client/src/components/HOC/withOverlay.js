import React from "react";
const WithOverlay = OriginalComponent => {
    const NewComponent = props => {
       return <div className="over"><OriginalComponent {...props} /></div>;
    }
    return NewComponent;
}

export default WithOverlay;