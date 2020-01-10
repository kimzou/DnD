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
      // ['list-1']: [],
      'list-1': [],
    }
  });

  const [count, setCount] = useState(0);
  // const [isLoaded, setIsLoaded] = useState(false);
  let list = data.list;

  const onDragEnd = result => {
    console.log('drag end');
    const { destination, source, draggableId, type } = result;
    console.log({destination});
    console.log({source});
    console.log({draggableId});
    
    console.log({result});
    
    // return if no destination, if it is the same 
    // or the item is back to this place
    if (!destination) return;

    // if the draggable is drag in the same droppable
    if (source.draggableId === destination.draggableId) {
      // TODO : drag from one list to another
      
    }
    
    // TODO : reorder component


    // console.log({list});
    // list[destination.droppableId] = "lol"
    // console.log('list[droppableid]', list[destination.droppableId]);
    // console.log('list[list-1]', list['list-1']);
    
    // const newList = Array.from(list[destination.droppableId]);
    // console.log('avant splice', {newList});
    // newList.splice(source.index, 1);
    // const [removed] = newList.splice()
    // newList.splice(destination.index, 0, `${count}-${draggableId}`)
    // console.log('apres splice', {newList});
    
    // setData({
    //   ...data,
    //   list: {
    //     ...list,
    //     [destination.droppableId]: newList,
    //   }
    // });

    setCount(count + 1)

    switch (source.droppableId) {
      // case the droppableId is the same (the same list)
      case destination.droppableId:
        // console.log('%c data un destination', 'color: red');
        // console.log({data});
        // console.log('%c case destination.droppableId', 'color: #bada55');
        // console.log('source', source.index);
        
        // console.log('list[source.droppableId][source.index]', list[source.droppableId][source.index]);
        // console.log('list[source.droppableId]', list[source.droppableId]);
        
        // const newList = Array.from(list[source.droppableId]);
        // const newList = list[source.droppableId];
        const newList = Object.values(list[source.droppableId]);
        // console.log('typeof newlist', typeof newList);
        
        console.log('1',{newList});

        const removed = newList[source.index];
        const added = newList[destination.index];
        // const [removed] = newList.splice(source.index, 1);

        console.log({removed});
        // console.log('destination.index', destination.index);
        // delete newList[source.index];

        newList[source.index] = added;
        newList[destination.index] = removed;
        // newList.splice(destination.index, 0, removed);
        // console.log('newList[destination.index]', newList[destination.index]);
        
        // newList[destination.index] = removed;
        console.log('2',{newList});

        setData({
          ...data,
          list: {
            [source.droppableId]: newList,  
          }
        });
        console.log({data});
        
        break;
      // when an item is drop on a list

      // when an item is drop in another list
      default:
          console.log('%c case default', 'color: turquoise');
          setData({
            ...data,
            list: {
              ...list,
              // Name of the droppable list
              [destination.droppableId]: {
                ...list[destination.droppableId],
                // Name of the component but if exists replace the old one so it has to be an increment number
                // [`${count}-${draggableId}`]: data.components[draggableId]
                [count]: data.components[draggableId]
              }
            }
          })
        break;
    }
    console.log({data});
  }
  
  return(
    <DragDropContext onDragEnd={onDragEnd}>
        <Container>
            <MimoArea>
              <MimoDisplay list={data.list}/>
            </MimoArea>
            <Droppable droppableId="components" >
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