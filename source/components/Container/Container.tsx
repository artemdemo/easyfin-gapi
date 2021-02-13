import React from 'react';

export const Container:React.FC = (props) => {
  return (
    <div className='container mx-auto'>
      {props.children}
    </div>
  );
};
