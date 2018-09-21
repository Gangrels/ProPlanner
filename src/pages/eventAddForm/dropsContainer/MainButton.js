import React from 'react';
import Button from '@material-ui/core/Button';

const MainButton = props => {
  // const { history, link } = props;
  // console.log(props);

  const mainButtonStyle = {
    borderRadius: '2px',
    width: '130px',
    height: '36px',
    marginRight: '24px',
    background: '#00BCD4',
    color: '#FFFFFF',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)',
  };

  const mainButtonText = 'SAVE';

  const handleClick = () => {
    // console.log(123);
    // history.push(link);
  };

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      style={mainButtonStyle}
      className="drops-list-button"
      onClick={handleClick}
    >
      {mainButtonText}
    </Button>
  );
};

export default MainButton;