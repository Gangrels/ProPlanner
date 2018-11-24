import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import IncreaseIcon from 'assets/images/increase-icon.svg';
import PriorityArrow from 'components/Icons/PriorityArrow.js';
import { priorityOptions } from 'config';

import './styles.css';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

const options = [
  {
    tag: 'High',
    icon: <PriorityArrow fill={priorityOptions.high.color} />,
  },
  {
    tag: 'Normal',
    icon: <PriorityArrow fill={priorityOptions.normal.color} />,
  },
  {
    tag: 'Low',
    icon: (
      <PriorityArrow fill={priorityOptions.low.color} direction={priorityOptions.low.direction} />
    ),
  },
];

class Priority extends Component {
  button = null;

  state = {
    anchorEl: null,
    selectedIndex: this.props.priority,
  };

  componentWillReceiveProps(newProps) {
    const index = options.findIndex(
      option => option.tag.toLowerCase() === newProps.input.value.toLowerCase()
    );
    index !== -1 ? this.setState({ selectedIndex: index }) : this.setState({ selectedIndex: 1 });
  }

  handleClickListItem = (event, view) => {
    if (view) {
      return;
    }
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index, input, tag) => {
    input.onChange(tag);
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, view, input } = this.props;
    const { anchorEl, selectedIndex } = this.state;

    const viewMode = view ? 'list-item-view' : 'list-item';

    return (
      <div className={classes.root}>
        <div
          onClick={event => this.handleClickListItem(event, view)}
          className={viewMode}
          onChange={this.handle}
        >
          <div>
            <img src={IncreaseIcon} alt="IncreaseIcon" />
            <span className="list-item-main-text">Priority</span>
          </div>
          <div className="list-item-secondary-item">
            {options[selectedIndex].icon}
            <span className="list-item-secondary-text">{options[selectedIndex].tag}</span>
          </div>
        </div>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={`${option}${index}`}
              selected={index === selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index, input, option.tag)}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              {` ${option.tag}`}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(Priority);
