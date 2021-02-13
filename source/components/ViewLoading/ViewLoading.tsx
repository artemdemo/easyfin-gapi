import React from 'react';
import {EFaIcons} from '../Icon/iconProps';
import {Icon} from '../Icon/Icon.async';

export const ViewLoading: React.FC = () => {
  return (
    <div className='text-blue-300'>
      <Icon
        iconName={EFaIcons.faCircleNotch}
        size='2x'
        spin
      />
    </div>
  );
};
