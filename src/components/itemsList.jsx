import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Clone, Kiosk, Item } from '../styled';
import { ITEMS } from '../items';

const ItemsList = () => {
    return(
        <Droppable droppableId="ITEMS" isDropDisabled={true}>
            {(provided, snapshot) => (
                <Kiosk
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}>
                    {ITEMS.map((item, index) => (
                        <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                        >
                            {(provided, snapshot) => (
                                <>
                                    <Item
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        isDragging={snapshot.isDragging}
                                        style={
                                            provided.draggableProps
                                                .style
                                        }>
                                        {item.content}
                                    </Item>
                                    {snapshot.isDragging && (
                                        <Clone>{item.content}</Clone>
                                    )}
                                </>
                            )}
                        </Draggable>
                    ))}
                {provided.placeholder}
                </Kiosk>
            )}
        </Droppable>
    );
}

export default ItemsList;