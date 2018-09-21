import React from 'react';
import Button from '@material-ui/core/Button';

const MainButton = props => {
  const { view, history, link } = props;
  // console.log(props);

  const mainButtonStyle = view
    ? {
        borderRadius: '2px',
        width: '130px',
        height: '36px',
        marginRight: '24px',
        background:
          'linear-gradient(0deg, rgba(0, 188, 212, 0.1), rgba(0, 188, 212, 0.1)), #FFFFFF',
        color: '#00BCD4',
        boxShadow: '0px 2px 2px rgba(0, 188, 212, 0.24), 0px 0px 2px rgba(0, 188, 212, 0.12)',
      }
    : {
        borderRadius: '2px',
        width: '130px',
        height: '36px',
        marginRight: '24px',
        background: '#00BCD4',
        color: '#FFFFFF',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)',
      };

  const mainButtonText = view ? 'EDIT' : 'SAVE';

  const handleClick = () => {
    history.push(link);
  };

  return (
    <Button
      onClick={handleClick}
      type={!view ? '' : 'submit'}
      variant="contained"
      color="primary"
      style={mainButtonStyle}
      className="drops-list-button"
    >
      {mainButtonText}
    </Button>
  );
};

export default MainButton;