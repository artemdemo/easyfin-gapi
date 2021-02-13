import {FontAwesomeIconProps} from '@fortawesome/react-fontawesome';

export enum EFaIcons {
  faFilter = 'faFilter',
  faExclamationTriangle = 'faExclamationTriangle',
  faSortAlphaDown = 'faSortAlphaDown',
  faSortAlphaDownAlt = 'faSortAlphaDownAlt',
  faCircleNotch = 'faCircleNotch',
}

export interface IIconProps extends Omit<FontAwesomeIconProps, 'icon'> {
  iconName: EFaIcons;
}
