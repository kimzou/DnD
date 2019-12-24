import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Task from './task';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
`;

const Column = (props) => {
    return(
        <Container>
            <Title>{props.column.title}</Title>
            <Droppable droppableId={props.column.id}>
                {provided => (
                    
                    <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    >
                        {/* {console.log({provided})} */}
                        {props.tasks && props.tasks.map((task, i) => 
                            <Task key={task && task.id} task={task} index={i}/>
                        )}
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>
        </Container>
    );
}

export default Column;