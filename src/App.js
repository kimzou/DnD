import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
 
import initialData from './initialData';
import MimoDisplay from './components/MimoDisplay';
import MimoComponent from './components/MimoComponent';
import Input from './input';

const Container =  styled.div`
  display: flex;
`;

const MimoArea = styled.div`
  background-color: lightgrey;
  width: 300px;
  height: 400px;
  margin: 100px auto;
  border: solid 3px grey;
`;

const ComponentList = styled.div`
  backgroud-color: white;
  margin: 100px auto;
  border: 3px solid black;
  height: 400px;
  width: 150px;
`;

const App = () => {

  const [data, setData] = useState(initialData);

  const onDragEnd = result => {
    console.log('drag end');
    const { destination, source, draggableId, type } = result;
    console.log({destination});
    console.log({source});
    console.log({draggableId});
    
    console.log({result});
    
    if (!destination) return;
    // TODO: return if destination is the same or the item is back to this place

    // keep the component dragged in an array
    const droppedCompo = data.droppedCompo ? data.droppedCompo : [];

    setData({
      ...data,
      droppedCompo: [
        ...droppedCompo, 
        result.draggableId
      ],
    });

    console.log({droppedCompo});
    console.log({data});
    
    // const componentOrder = Array.from(data.componentOrder);
    // const componentName = componentOrder[source.index];
    // const item = data.components[componentName].onDrop;
    // return item;
  }
  
  return(
    <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          <Droppable droppableId="mimo-area">
              {provided => (
                <MimoArea 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                >
                  <MimoDisplay compo={data}/>
                  {provided.placeholder}
                </MimoArea>
              )}
            </Droppable>
            <Droppable droppableId="mimo-components" isDropDisabled={true}>
              {provided => (
                <ComponentList {...provided.droppableProps} ref={provided.innerRef}>
                  {data.componentOrder.map((c, i) => {
                    const compo = data.components[c];
                    return <MimoComponent key={`compo-${compo.id}`} compo={compo} index={i} />                   
                  })}
                  {provided.placeholder}
                </ComponentList>
              )}
          </Droppable>
        </Container>
    </DragDropContext>
  );
}

export default App;