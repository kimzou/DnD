const initalData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Take out the grabage' },
        'task-2': { id: 'task-2', content: 'Watch my favourite show' },        
        'task-3': { id: 'task-3', content: 'Go out with my dog' },        
        'task-4': { id: 'task-4', content: 'Be happ y' }
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        }
    },
    // Facilitate reordering of the column
    columnOrder: ['column-1'],
}

export default initalData;