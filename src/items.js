import React from 'react';
import { uuid } from 'uuidv4';
import TitleInput from './components/titleInput';
import Row from './components/row';

export const ITEMS = [
    {
        id: uuid(),
        content: 'Row',
        onDrop: <Row />
    },
    {
        id: uuid(),
        content: 'Title',
        onDrop: <TitleInput />
    },
    {
        id: uuid(),
        content: 'Text',
    },
    {
        id: uuid(),
        content: 'Image',
    },
    {
        id: uuid(),
        content: 'Video'
    },
];