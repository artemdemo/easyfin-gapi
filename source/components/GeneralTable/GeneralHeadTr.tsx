import React from 'react';
import {HeaderGroup} from 'react-table';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSortAlphaDown, faSortAlphaDownAlt} from '@fortawesome/free-solid-svg-icons';
import {IColumnInstance, IHeaderGroup} from '../../types/react-table';
import {getTableThClass} from '../../styles/table';

type TProps = {
    headerGroup: HeaderGroup;
    menu?: (row: any) => any;
};

class GeneralHeadTr extends React.PureComponent<TProps> {
    renderSortingIcon(column: IColumnInstance) {
        if (column.isSorted) {
            return (
                <>
                    &nbsp;
                    <FontAwesomeIcon
                        icon={column.isSortedDesc ? faSortAlphaDownAlt : faSortAlphaDown}
                    />
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
                        </th>
                    );
                })}
                {this.renderMenuColumn()}
            </tr>
        );
    }
}

export default GeneralHeadTr;
