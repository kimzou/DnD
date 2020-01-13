import React, { useState } from 'react';

const TitleInput = () => {

    const [title, setTitle] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        setIsSubmit(!isSubmit);
    }

    return(
        !isSubmit 
            ? <form onSubmit={onSubmit}>
                <input 
                    name="title-input" 
                    value={title} 
                    onChange={ e => setTitle(e.target.value) } 
                />
            </form>
        : <h2>{title}</h2>
    );
}

export default TitleInput;