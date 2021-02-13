import React from 'react';
import {IIconProps} from './iconProps';

const IconAsync = React.lazy(() => import('./Icon'));

export const Icon: React.FC<IIconProps> = (props) => {
  return (
    <React.Suspense fallback={null}>
      <IconAsync {...props} />
    </React.Suspense>
  );
};
