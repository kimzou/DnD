import React from "react";
import Input from "./input";

const initialData = {
    components: {
        "compo-1": { id: 1, name: "text", onDrop: <Input /> },
        "compo-2": { id: 2, name: "title" },
        "compo-3": { id: 3, name: "image" },
        "compo-4": { id: 4, name: "video" }    
    },
    componentOrder: ["compo-1", "compo-2", "compo-3", "compo-4"],
}

export default initialData;