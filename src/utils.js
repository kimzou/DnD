import { uuid } from 'uuidv4';

export const reorder = (list, startIndex, endIndex) => {
    console.log('list', list);
    console.log('type of list', typeof list)
    const result = Array.from(list);
    console.log('1 result',result);
    console.log('type of result', typeof result)
    const [removed] = result.splice(startIndex, 1);
    console.log({removed});
    result.splice(endIndex, 0, removed);
    console.log('2',{result})
    return result;
};


export const copy = (source, destination, droppableSource, droppableDestination) => {
    console.log('dest', destination)
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    console.log('destination', destClone)
    const item = sourceClone[droppableSource.index];

    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });

    console.log('copy', destClone)
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