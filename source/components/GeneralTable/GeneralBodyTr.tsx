import React from 'react';
import {Row} from 'react-table';
import {getTableTdClass} from '../../styles/table';

type TProps = {
    row: Row;
    menu?: (row: any) => any;
};

class GeneralBodyTr extends React.Component<TProps> {
    renderMenuColumn() {
        const { row, menu } = this.props;
        if (menu) {
            return (
                <td
                    className={getTableTdClass({
                        borderR: true,
                        // Here I'm not adding padding, since this cell is dedicated for the menu button.
                        // Padding should be defined by the button or buttons wrapper.
                        // I just don't have a way of knowing what size of the button here will be.
                        withPadding: false,
                    })}
                >
                    {menu && menu(row)}
                </td>
            );
        }
        return null;
    }

    render() {
        const { row, menu } = this.props;
        return (
            <tr {...row.getRowProps()}>
                {row.cells.map((cell, idxCell) => (
                    <td
                        className={getTableTdClass({
                            borderL: idxCell === 0,
                            borderR: !menu,
                        })}
                        {...cell.getCellProps()}
                    >
                        {cell.render('Cell')}
                    </td>
                ))}
                {this.renderMenuColumn()}
            </tr>
        )
    }
}

export default GeneralBodyTr;
