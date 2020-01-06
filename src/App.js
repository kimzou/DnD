import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
 
import initialData from './initialData';
import MimoDisplay from './components/MimoDisplay';
import MimoComponent from './components/MimoComponent';
import { reorder, copy } from './helpers';

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

  const [data, setData] = useState({
    ...initialData, 
    list: { 
      ['list-1']: [],
    }
  });

  const [count, setCount] = useState(0);

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

    // const droppedCompo = data.droppedCompo ? data.droppedCompo : [];

    // setData({
    //   ...data,
    //   droppedCompo: [
    //     ...droppedCompo, 
    //     result.draggableId
    //   ],
    // });
    const list = data.list;
    console.log("splice",Array.from(data.components[draggableId]).splice(destination.index, 0, {...list}));
    console.log('keys', Object.keys(data.list).length);
    
    console.log('destination.droppableId', destination.droppableId);
    console.log('list destination', list[destination.droppableId]);
    setCount(count + 1)
    setData({
      ...data,
      list: {
        ...list,
        // Name of the droppable list
        [destination.droppableId]: {
          // [Array.from(data.components[draggableId]).splice(destination.index, 0, {...list})]: {
          ...list[destination.droppableId],
          // Name of the component but if exists replace the old one so it has to be an increment number
          [`${count}-${draggableId}`]: data.components[draggableId]
          // [Object.keys(data.list).length\]: data.components[draggableId]
          // [Array.from(data.components[draggableId]).splice(destination.index, 0, {...list})]: data.components[draggableId]
        }
      }
    })

    if (source.draggableId === destination.draggableId) {
      
      // setData({
      //   components: {
      //     ...data.components,
      //     [destination.droppableId]: reorder(
      //       data.components[result.draggableId],
      //       source.index,
      //       destination.index
      //     )
      //   }
      // })
    }

    // console.log({droppedCompo});
    console.log({data});
  }
  
  return(
    <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {/* <Droppable droppableId="mimo-area">
              {provided => (
                <MimoArea 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                > */}
                <MimoArea>
                  <MimoDisplay list={data.list}/>
                </MimoArea>
                  {/* {provided.placeholder}
                </MimoArea> */}
              {/* )}
            </Droppable> */}
            <Droppable droppableId="components" isDropDisabled={true}>
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