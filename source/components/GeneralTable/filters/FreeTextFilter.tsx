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
            onChange={(e) => {
                const { value } = e.target;
                setFilter(value || undefined);
            }}
        />
    );
};

export default FreeTextFilter;
