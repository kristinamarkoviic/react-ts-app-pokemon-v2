import { FC } from 'react';

export type Route = {
    key: string;
    title: string;
    description?: string;
    path: string;
    element: FC<{}>;
}