import React from 'react';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';

import initialData from './initial-data';
import Column from './components/column';

const App = () => {
  const data = initialData;

  const onDragEnd = () => {
    console.log('drag end');
    
    //TODO: reorder our columns
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
