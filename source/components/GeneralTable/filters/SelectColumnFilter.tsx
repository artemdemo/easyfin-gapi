import React from 'react';
import {t} from '../../../services/i18n';

const SelectColumnFilter = (props) => {
    const {
        column: { filterValue, setFilter, preFilteredRows, id },
    } = props;

    const options = React.useMemo(() => {
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
                setFilter(e.target.value || undefined);
            }}
        >
            <option value="">{t('common.all')}</option>
            {options.map((option: string, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

export default SelectColumnFilter;
