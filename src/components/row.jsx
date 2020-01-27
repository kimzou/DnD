import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const InnerRow = styled.div`
    background-color: purple;
    padding: 0.5rem 0.5rem 0;
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
`;

// how to pass count in props from items file


const Row = () => {
    const [count, setCount] = useState(0);
    console.log("row", {count});
    useEffect(count => {
        setCount(count+1);
    }, [])

    return(
        <Droppable droppableId={`list-${count}`}>
            {(provided, snapshot) => (
                <InnerRow {...provided.droppableProps} ref={provided.innerRef}>
                    hello
                    {provided.placeholder}
                </InnerRow>
            )}
        </Droppable>
    );
}

export default Row;