import React from 'react';

type TProps = {
    children: any;
};

const Container = (props: TProps) => {
    return (
        <div className='container mx-auto'>
            {props.children}
        </div>
    );
};

export default Container;
