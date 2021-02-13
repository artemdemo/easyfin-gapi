import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import {IIconProps} from './iconProps';

const Icon: React.FC<IIconProps> = (props) => {
  const { iconName, ...faProps } = props;
  return (
    <FontAwesomeIcon
      icon={icons[iconName]}
      {...faProps}
    />
  );
};

export default Icon;
