import React from 'react';

const MimoDisplay = props => {

    // map the state to render components who has been moved

    return(
        <>
        {console.log('props', props.compo)}
        
        {props.compo.droppedCompo && props.compo.droppedCompo.map((c, i) => {
            const onDrop = props.compo.components[c].onDrop;            
            return <p key={i}>{onDrop}</p>
        })}
        </>
    );
}

export default MimoDisplay;