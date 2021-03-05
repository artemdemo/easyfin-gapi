import React, {ReactChild} from 'react';
import classnames from 'classnames';

export enum EInfoAppearance {
  error = 'error',
  warning = 'warning',
  info = 'info',
}

type TProps = {
  children: any;
  title?: ReactChild;
  appearance?: EInfoAppearance;
};

class InfoPanel extends React.PureComponent<TProps> {
  renderTitle() {
    const {title} = this.props;
    if (title) {
      return (
        <p className='font-bold'>
          {title}
        </p>
      );
    }
    return null;
  }

  render() {
    const {appearance} = this.props;
    return (
      <div
        className={classnames({
          'border-l-4 p-4': true,
          'bg-blue-100 border-blue-500 text-blue-700': !appearance || appearance === EInfoAppearance.info,
          'bg-red-100 border-red-500 text-red-700': appearance === EInfoAppearance.error,
          'bg-orange-100 border-orange-500 text-orange-700': appearance === EInfoAppearance.warning,
        })}
        role='alert'
      >
        {this.renderTitle()}
        <p>{this.props.children}</p>
      </div>
    );
  }
}

export default InfoPanel;
