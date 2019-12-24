import React, { useState } from 'react';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import initialData from './initial-data';
import Column from './components/column';

const Container = styled.div`
  display: flex;
`;

const App = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = result => {
    
    const { destination, source, draggableId } = result;
    console.log({destination, source, draggableId});

    // If the destination doesn't exists or the user drop the item back in the same place
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Get the column and this taskIds
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];
    
    // Moving in the same list
    if (start === finish) {

      const newTaskIds = Array.from(start.taskIds);
      console.log({newTaskIds});
      
      // Modify newTaskIds to reorder the tasks
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
  
      // Create a new column with the new array of taskIds
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }
  
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        }
      }
  
      setData(newState);
      return;
    }

    // Moving from one list to a another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    };

    setData(newState);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>    
      <Container>
        {data.columnOrder.map(columnId => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;      
        })};
      </Container>
    </DragDropContext>
  )
}

export default App;
