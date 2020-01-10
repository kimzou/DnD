import React, { useState } from 'react';

const Input = () => {
    
    const [title, setTitle] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    
    const handleSubmit = e => {
        e.preventDefault();
        setIsSubmit(true);
    }
    
    return(
        !isSubmit 
        ? <form onSubmit={ handleSubmit }>
            <input
                placeholder="Insert your title" 
                name="title" 
                onChange={ e => setTitle(e.target.value) } 
                value={ title } 
            />
         </form>
        : <h2>{ title }</h2>
    );
}

export default Input;