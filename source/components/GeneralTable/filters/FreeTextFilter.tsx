import React from 'react';
import {t} from '../../../services/i18n';

const FreeTextFilter = (props) => {
    const {
        column: { filterValue, setFilter },
    } = props;

    return (
        <input
            value={filterValue || ''}
            placeholder={t('common.search')}
            onClick={(e) => {
                e.stopPropagation();
            }}
            onChange={(e) => {
                const { value } = e.target;
                setFilter(value || undefined);
            }}
        />
    );
};

export default FreeTextFilter;
