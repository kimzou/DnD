import React, { useState } from 'react';
import { reorder, move, copy } from './utils';
import { uuid } from 'uuidv4';
import { ITEMS } from './items';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  Item, 
  Content, 
  Button, 
  ButtonText, 
  Notice, 
  Handle, 
  Container,
  Clone
} from './styled';
import ItemsList from './components/itemsList';

const App = () => {

  const [count, setCount] = useState(1);
  const [data, setData] = useState({
      [`list-${count}`]: []
  });
//   const [data, setData] = useState({
//     [uuid()]: []
// });

  const onDragEnd = result => {
      const { source, destination } = result;
      console.log('dragEnd', {data, count});
      console.log({result});
      // dropped outside the list
      // block all drop on "sections"
      if (!destination || destination.droppableId === 'SECTIONS') {
        return;
      }

      switch (source.droppableId) {
          case destination.droppableId:
             console.log('source.droppableId');
              setData({
                  [destination.droppableId]: reorder(
                      data[source.droppableId],
                      source.index,
                      destination.index
                  )
              });
              break;
          case 'ITEMS':
              console.log('items', {data});
              const spread = [...data[destination.droppableId]]
              console.log('...data[destination.droppableId]', spread)
              setData({
                  ...data,
                  [destination.droppableId]: copy(
                      ITEMS,
                      data[destination.droppableId],
                      source,
                      destination
                  )
              });
              break;
          default:
             console.log('default (move)');
              const rep = source.droppableId.replace('item-', '')
              console.log({rep})
              setData(
                  move(
                      data[rep],
                      data[destination.droppableId],
                      source,
                      destination
                  )
              );
              break;
      }

  };

  const addList = e => {
    console.log('add list',{ count, data });
      setCount(count+1)
      setData({ 
        ...data,
        [`list-${count+1}`]: [] 
      });
      // setData({ 
      //   ...data,
      //   [uuid()]: [] 
      // });
      console.log('addList after set', {data});
  };

  return (
      <DragDropContext onDragEnd={onDragEnd}>
          <ItemsList />
          <Button onClick={addList}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                      fill="currentColor"
                      d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                  />
              </svg>
            <ButtonText>Add List</ButtonText>
          </Button>

          <Droppable droppableId="SECTIONS">
            {(provided, snapshot) => (
            <Content ref={provided.innerRef}>
              <>
              {Object.keys(data).map((list, i) => (
                <Droppable key={list} droppableId={list}>
                  {(provided, snapshot) => (
                    <Container
                      ref={provided.innerRef}
                      isDraggingOver={snapshot.isDraggingOver}
                    >
                      {console.log('map keys data',{data, list})}
                      <Draggable draggableId={list} index={i} key={list}>
                        {(provided, snapshot) => (
                          <>
                            <span {...provided.dragHandleProps} isdragging={provided.isDragging}>
                              <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  color="blue"
                              >
                                <path
                                    fill="currentColor"
                                    d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                                />
                              </svg>
                            </span>
                            <div {...provided.draggableProps} ref={provided.innerRef}>
                              {data[list].length
                                ? data[list].map(
                                    (item, index) => (
                                      <Droppable droppableId={`list-item-${index+1}`} key={`list-item-${index}`}>
                                        {(provided, snapshot) => (
                                          <div ref={provided.innerRef} >
                                            <Draggable
                                              key={item.id}
                                              draggableId={item.id}
                                              index={index}
                                            >
                                              {(provided, snapshot) => (
                                                <Item
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  isDragging={snapshot.isDragging}
                                                  style={provided.draggableProps.style}
                                                >
                                                {/* {console.log("data[list]", index)} */}
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
                                                {item.onDrop || item.content}
                                                </Item>
                                              )}
                                            </Draggable>
                                            {provided.placeholder}
                                           </div>
                                        )}
                                      </Droppable>
                                      
                                    )
                                  )
                                : !provided.placeholder && (
                                  <Notice>Drop items here</Notice>
                              )}
                            </div>
                          </>
                        )}
                      </Draggable>
                      {provided.placeholder}
                  </Container>
                )}
              </Droppable>
              ))}
              </>
            {provided.placeholder}
          </Content>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default App;