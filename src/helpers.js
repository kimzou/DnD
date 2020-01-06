export const reorder = (list, startIndex, endIndex) => {
    console.log('reoder', {list, startIndex, endIndex});
    
    const result = Array.from(list);
    console.log('reorder result', result);
    
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    console.log('reorder return', result);

    return result;
};

export const copy = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];

    // destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    destClone.splice(droppableDestination.index, 0, { ...item,});

    return destClone;
};

export const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};