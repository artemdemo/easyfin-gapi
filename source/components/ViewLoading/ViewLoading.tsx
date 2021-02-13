import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleNotch} from '@fortawesome/free-solid-svg-icons';

export const ViewLoading: React.FC = () => {
  return (
    <div className='text-blue-300'>
      <FontAwesomeIcon
        icon={faCircleNotch}
        size='2x'
        spin
      />
    </div>
  );
};
