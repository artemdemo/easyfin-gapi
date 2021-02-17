import {Modify} from '../../types/utils';

export type TDefinitionItem = {
  idx: number;
  name: string;
  convertToExcel?: (value: any) => string;
  convertFromExcel?: (value: string) => any;
};

export type TTableDefinition<T> = {
  [key in keyof T]: Modify<TDefinitionItem, {
    name: key;
  }>;
};
