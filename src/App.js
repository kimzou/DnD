import React, { useState } from 'react';
import { reorder, move, copy } from './utils';
import { uuid } from 'uuidv4';
import { ITEMS } from './items';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  Item, 
  Clone, 
  Content, 
  Button, 
  ButtonText, 
  Kiosk, 
  Notice, 
  Handle, 
  Container
} from './styled';

const App = () => {
  
  const [data, setData] = useState({
      [uuid()]: []
  });

  const onDragEnd = result => {
      const { source, destination } = result;

      // dropped outside the list
      if (!destination) {
          return;
      }

      switch (source.droppableId) {
          case destination.droppableId:
             console.log('source.droppableId')
              setData({
                  [destination.droppableId]: reorder(
                      data[source.droppableId],
                      source.index,
                      destination.index
                  )
              });
              break;
          case 'ITEMS':
              console.log('items')
              setData({
                  [destination.droppableId]: copy(
                      ITEMS,
                      data[destination.droppableId],
                      source,
                      destination
                  )
              });
              break;
          default:
             console.log('default')
              setData(
                  move(
                      data[source.droppableId],
                      data[destination.droppableId],
                      source,
                      destination
                  )
              );
              break;
      }

  };

  const addList = e => {
      setData({ [uuid()]: [] });
  };

      return (
          <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="ITEMS" isDropDisabled={true}>
                  {(provided, snapshot) => (
                      <Kiosk
                          ref={provided.innerRef}
                          isDraggingOver={snapshot.isDraggingOver}>
                          {ITEMS.map((item, index) => (
                              <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}>
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
              <Content>
                  <Button onClick={addList}>
                      <svg width="24" height="24" viewBox="0 0 24 24">
                          <path
                              fill="currentColor"
                              d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                          />
                      </svg>
                      <ButtonText>Add List</ButtonText>
                  </Button>
                  <>
                  {Object.keys(data).map((list, i) => (
                      <Droppable key={list} droppableId={list}>
                          {(provided, snapshot) => (
                              <Container
                              ref={provided.innerRef}
                              isDraggingOver={snapshot.isDraggingOver}>
                                  {data[list].length
                                      ? data[list].map(
                                          (item, index) => (
                                              <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                    {(provided, snapshot) => (
                                                        <Item
                                                          ref={
                                                              provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            isDragging={
                                                                snapshot.isDragging
                                                            }
                                                            style={
                                                                provided
                                                                .draggableProps
                                                                .style
                                                            }
                                                          >
                                                            <Handle
                                                                {...provided.dragHandleProps}>
                                                                <svg
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24">
                                                                    <path
                                                                        fill="currentColor"
                                                                        d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                                                                    />
                                                                </svg>
                                                            </Handle>
                                                            {item.ondrop || item.content}
                                                        </Item>
                                                    )}
                                                </Draggable>
                                            )
                                        )
                                      : !provided.placeholder && (
                                            <Notice>Drop items here</Notice>
                                        )}
                                  {provided.placeholder}
                              </Container>
                          )}
                      </Droppable>
                  ))}
                  </>
              </Content>
          </DragDropContext>
      )
}

export default App;