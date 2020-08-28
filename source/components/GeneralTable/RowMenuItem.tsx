import React from 'react';
import classnames from 'classnames';

export type TRowMenuItem = {
    text: string;
    className?: string;
    onClick?: (e: any) => void;
};

type TProps = {
    item: TRowMenuItem;
    onClick: (item: TRowMenuItem) => void
};

class RowMenuItem extends React.PureComponent<TProps> {
    handleClick = () => {
        const { item, onClick } = this.props;
        onClick(item);
    };

    render() {
        const { item } = this.props;
        return (
            <div
                className={classnames(
                    'px-4 py-2 border-b cursor-pointer hover:bg-gray-100',
                    item.className,
                )}
                onClick={this.handleClick}
            >
                {item.text}
            </div>
        );
    }
}

export default RowMenuItem;
