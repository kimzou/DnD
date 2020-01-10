import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const List = styled.div`
    border: 1px
        ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
    background: #fff;
    padding: 0.5rem 0.5rem 0;
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
`;

const Container = styled(List)`
    margin: 0.5rem 0.5rem 1.5rem;
    // background-color: lightgrey;
    // width: 300px;
    // height: 400px;
    // margin: 100px auto;
`;

const Item = styled.div`
    // //display: inline-block;
    // width: 50px;
    // height: 50px;
    // border: 2px solid lightgrey;
    // background-color: white;
    // display: flex;
    // align-items: flex-start;
    // align-content: flex-start;
`;

const Notice = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    padding: 0.5rem;
    margin: 0 0.5rem 0.5rem;
    border: 1px solid transparent;
    line-height: 1.5;
    color: #aaa;
`;

const MimoDisplay = props => {

    // valid an input
    return(
        <>
        {console.log('props list', props.list)}
        {Object.keys(props.list).map((l, i) => (
            <Droppable key={l} droppableId={l}>
                {(provided, snapshot) => (
                    <Container 
                        ref={provided.innerRef} 
                        isDraggingOver={snapshot.isDraggingOver}
                        {...provided.droppableProps}
                    >
                        
                    {console.log('map', props.list[l])}
                        {Object.keys(props.list[l]).length 
                            ? Object.values(props.list[l]).map(
                                (item, i) => (
                                    <Draggable 
                                        key={i}
                                        draggableId={`mimo-item-${item.id}`}
                                        index={i}
                                        type={`${props.list[l]}`}
                                    >
                                        {(provided, snapshot) => (
                                            <Item
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                isDragging={snapshot.isDragging}
                                            >
                                                {item.onDrop || item.name}
                                                {console.log({item})}
                                            </Item>
                                        )}
                                    </Draggable>
                                )
                            )
                            : !provided.placeholder && (<Notice>Drop items here</Notice>)
                            }
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        ))}
        </>
    );
}

export default MimoDisplay;