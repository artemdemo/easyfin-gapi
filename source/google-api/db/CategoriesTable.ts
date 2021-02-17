import {TTableDefinition} from './db-types';

export interface ICategoriesTable {
  id: string;
  name: string;
  parent: string;
}

export const categoriesTableDefinition: Readonly<TTableDefinition<ICategoriesTable>> = {
  id: {
    idx: 0,
    name: 'id',
  },
  name: {
    idx: 1,
    name: 'name',
  },
  parent: {
    idx: 2,
    name: 'parent',
  },
};
