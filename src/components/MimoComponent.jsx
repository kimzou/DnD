import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Item = styled.div`
    //display: inline-block;
    width: 50px;
    height: 50px;
    border: 2px solid lightgrey;
    background-color: white;
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
`;

const Clone = styled(Item)`
    div {
        display: none !important;
    }
    ~ div {
        transform: none !important;
    }
`;

const MimoComponent = props => {
    return(
        <Draggable draggableId={`compo-${props.compo.id}`} index={props.index}>
            {(provided, snapshot)=> {
                // const style = {
                //     backgroundColor: snapshot.isDragging ? 'lightblue' : 'gray',
                //     ...provided.draggableProps.style,
                //   };
                //   console.log("isDraging ? : " , snapshot.isDraggingOver);
                  
                return(
                    <>
                    <Item 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps} 
                        ref={provided.innerRef}
                        // style={style}
                        // isDraggingOver={snapshot.isDraggingOver}
                    >
                        {props.compo.name}
                    </Item>
                    {/* {console.log('snapshot is draggin', snapshot.isDragging)} */}
                    
                    {snapshot.isDragging && (
                        <>
                        {/* {console.log('dragging')}                         */}
                        <Clone>{props.compo.name}</Clone>
                        </>
                    )}
                    </>
                )
            }}
        </Draggable>
    );
}

export default MimoComponent;