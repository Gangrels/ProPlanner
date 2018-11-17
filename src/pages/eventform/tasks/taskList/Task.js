import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from 'components/Icons/MoreIcon';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const styles = () => ({
  root: {
    borderRadius: '5%',
  },
  underline: {
    '&:after': {
      borderBottom: '1px solid red',
    },
  },
});

const options = ['Edit', 'Delete'];

class Task extends Component {
  state = {
    anchorEl: null,
    isEdit: false,
    name: this.props.task.name,
    originTitle: '',
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = option => {
    const { deleteTask, index } = this.props;
    const { name } = this.state;

    if (option === 'Edit') {
      this.setState({ isEdit: true, originTitle: name });
    }
    if (option === 'Delete') {
      deleteTask(index);
    }
    this.setState({ anchorEl: null });
  };

  changeHandle = e => {
    this.setState({ name: e.target.value });
  };

  saveHandle = () => {
    const { updateTask, index } = this.props;
    const { name } = this.state;

    updateTask(index, name);

    this.setState({ isEdit: false });
  };

  cancelHandle = () => {
    const { originTitle } = this.state;
    this.setState({ name: originTitle, isEdit: false });
  };

  render() {
    const { task, index, checkBoxHandle, view, classes } = this.props;
    const { anchorEl, isEdit, name } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <li className="task-list__item">
          <Checkbox
            checked={task.checked}
            onChange={() => checkBoxHandle(index)}
            style={{ color: '#00BCD4' }}
            color="primary"
            disabled={view}
          />
          {isEdit ? (
            <FormControl fullWidth style={{ cursor: 'pointer', marginRight: '15px' }}>
              <Input
                value={name}
                disableUnderline
                placeholder={name}
                onChange={this.changeHandle}
                style={{ cursor: 'pointer' }}
              />
            </FormControl>
          ) : (
            <React.Fragment>
              <span className={task.checked ? 'checked-task' : ''}>{task.name}</span>
              {!view ? (
                <span className="task-list__icon">
                  <IconButton
                    aria-label="More"
                    aria-owns={open ? 'long-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    classes={{
                      root: classes.root,
                    }}
                  >
                    <MoreIcon color="#8eaad4" />
                  </IconButton>
                  <Menu id="long-menu" anchorEl={anchorEl} open={open} onClose={this.handleClose}>
                    {options.map(option => (
                      <MenuItem
                        key={option}
                        selected={option === 'Edit'}
                        onClick={() => this.handleClose(option)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </span>
              ) : (
                ''
              )}
            </React.Fragment>
          )}
        </li>
        {!view && isEdit ? (
          <div className="task-list__button-container">
            <Button
              variant="contained"
              onClick={() => this.saveHandle()}
              style={{ backgroundColor: '#00BCD4', color: 'white', marginRight: '5px' }}
            >
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={this.cancelHandle}>
              Cancel
            </Button>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Task);
