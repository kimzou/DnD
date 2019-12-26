import React, { useState, memo } from 'react';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import initialData from './initial-data';
import Column from './components/column';

const Container = styled.div`
  display: flex;
`;

const InnerList = props => {
  const { column, taskMap, index } = props;
  const tasks = column.taskIds.map(taskId => taskMap[taskId]);
  return <Column column={column} tasks={tasks} index={index} />
}

const MemoInnerList = memo(
  InnerList,
  (prevProps, nextProps) => {
    if(
      nextProps.column !== prevProps.column &&
      nextProps.taskMap !== prevProps.taskMap &&
      nextProps.index !== prevProps.index
    ) return false;
  }
);

const App = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = result => {
    
    const { destination, source, draggableId, type } = result;
    console.log({destination, source, draggableId, type});

    // If the destination doesn't exists or the user drop the item back in the same place
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    if (type === "column") {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      }

      setData(newState);
      return;
    }
    // Get the column and this taskIds
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];
    
    // Moving in the same list
    if (start === finish) {

      const newTaskIds = Array.from(start.taskIds);

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
      <Droppable 
        droppableId="all-columns" 
        direction="horizontal" 
        type="column"
      >
        {provided => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.columnOrder.map((columnId, i) => {
              const column = data.columns[columnId];
              return (
                <MemoInnerList 
                  key={column.id} 
                  column={column} 
                  taskMap={data.tasks} 
                  index={i}
                />
              )      
            })};
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default App;
