import React from 'react';
import classnames from 'classnames';

type TProps = {
  className: string;
  children: any;
};

const TabsContainer: React.FC = (props: TProps) => (
  <div className={classnames('flex border-b border-gray-200 pb-2', props.className)}>
    {props.children}
  </div>
);

export default TabsContainer;
