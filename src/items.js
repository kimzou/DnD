import React from 'react';
import { uuid } from 'uuidv4';
import TitleInput from './components/titleInput';

export const ITEMS = [
    {
        id: uuid(),
        content: 'Title',
        ondrop: <TitleInput />
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