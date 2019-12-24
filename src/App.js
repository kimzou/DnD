import React, { useState } from 'react';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';

import initialData from './initial-data';
import Column from './components/column';

const App = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = result => {
    
    const { destination, source, draggableId } = result;
    console.log({destination, source, draggableId});

    // If the destination doesn't exists or the user drop the item back in the same place
    if (!destination && (destination.droppableId === source.droppableId && destination.index === source.index)) return;
    
    // Get the column and this taskIds
    const column = data.columns[source.droppableId];    
    const newTaskIds = Array.from(column.taskIds);
    console.log({newTaskIds});
    
    // Modify newTaskIds to reorder the tasks
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    // Create a new column with the new array of taskIds
    const newColumn = {
      ...column,
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
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>    
      {data.columnOrder.map(columnId => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;      
      })};
    </DragDropContext>
  )
}

export default App;
