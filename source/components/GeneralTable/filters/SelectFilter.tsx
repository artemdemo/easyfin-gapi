import React from 'react';
import {t} from '../../../services/i18n';
import {getRandom} from '../../../services/numbers';

const ALL = `all-${getRandom(5)}`;

const SelectFilter = (props) => {
  const {
    column: {filterValue, setFilter, preFilteredRows, id},
  } = props;

  const options = React.useMemo(() => {
    // I'm using Set in order to dismiss duplicate values.
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [
      ...options.values(),
    ];
  }, [id, preFilteredRows])

  return (
    <select
      value={filterValue}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onChange={(e) => {
        const {value} = e.target;
        setFilter(value === ALL ? undefined : value);
      }}
    >
      <option value={ALL}>{t('common.all')}</option>
      {options.map((option: string, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default SelectFilter;
