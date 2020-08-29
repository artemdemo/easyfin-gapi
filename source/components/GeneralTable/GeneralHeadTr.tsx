import React from 'react';
import {HeaderGroup} from 'react-table';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSortAlphaDown, faSortAlphaDownAlt} from '@fortawesome/free-solid-svg-icons';
import {IHeaderGroup} from '../../types/react-table';
import {getTableThClass} from '../../styles/table';

type TProps = {
    headerGroup: HeaderGroup;
    menu?: (row: any) => any;
};

class GeneralHeadTr extends React.Component<TProps> {
    renderSortingIcon(header: IHeaderGroup) {
        if (header.isSorted) {
            return (
                <>
                    &nbsp;
                    <FontAwesomeIcon
                        icon={header.isSortedDesc ? faSortAlphaDownAlt : faSortAlphaDown}
                    />
                </>
            );
        }
        return null;
    }

    renderFilter(header: IHeaderGroup) {
        if (header.canFilter && header.Filter) {
            return (
                <>
                    &nbsp;
                    {header.render('Filter')}
                </>
            );
        }
        return null;
    }

    renderMenuColumn() {
        const {menu} = this.props;
        if (menu) {
            return (
                <th
                    className={getTableThClass({
                        roundedTr: true,
                    })}
                >
                    &nbsp;
                </th>
            )
        }
        return null;
    }

    render() {
        const {headerGroup, menu} = this.props;
        return (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((header: IHeaderGroup, idx) => {
                    return (
                        <th
                            className={getTableThClass({
                                roundedTl: idx === 0,
                                roundedTr: !menu,
                            })}
                            {...header.getHeaderProps(
                                header.getSortByToggleProps()
                            )}
                        >
                            {header.render('Header')}
                            {this.renderSortingIcon(header)}
                            {this.renderFilter(header)}
                        </th>
                    );
                })}
                {this.renderMenuColumn()}
            </tr>
        );
    }
}

export default GeneralHeadTr;
