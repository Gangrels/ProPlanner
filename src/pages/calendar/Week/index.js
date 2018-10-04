import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withWindowWidth } from 'components/hocs/window-context';
import classNames from 'classnames';
import { colorTypes } from 'config';
import RenderEventsContainer from '../render-events';
import { prevWeek, nextWeek, selectDay } from '../../../modules/Calendar';
import './styles.css';
import Navigation from '../Navigation';
import DaySidebar from '../Day';

class Week extends Component {
  componentDidMount = () => {
    const { setHeight } = this.props;
    setHeight(70);
  };

  getEvents = today => {
    const { events, startTime, getHeight } = this.props;

    if (events.length) {
      const eventList = events
        .filter(ev => {
          const eventDay = ev.attributes['start-date'].clone().format('YYYY-MM-DD');
          return today === eventDay;
        })
        .map(ev => {
          const { 'start-date': start, 'end-date': end, 'event-type': type } = ev.attributes;
          return (
            <rect
              key={ev.id}
              width="100%"
              rx="10"
              ry="10"
              x="2%"
              y={startTime(start.clone())}
              height={getHeight(start.clone().valueOf(), end.clone().valueOf())}
              fill={colorTypes[type]}
            />
          );
        });

      return eventList;
    }
    return null;
  };

  getDays = () => {
    const { firstWeekDay } = this.props;
    const firstDay = firstWeekDay.clone().startOf('isoWeek');
    let currentDay;
    const days = Array(...Array(7)).map((_, i) => {
      currentDay = firstDay.clone().add(i, 'day');
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`calendar__events-container ${this.className(currentDay)}`}
          key={i}
          onClick={this.handleClick(currentDay.format('YYYY-MM-DD'))}
          data-qa={currentDay.format('YYYY-MM-DD')}
        >
          {this.dividingLines()}
          {this.getEvents(currentDay.format('YYYY-MM-DD'))}
        </svg>
      );
    });
    return days;
  };

  daysLabels = () => {
    const { firstWeekDay } = this.props;
    const firstDay = firstWeekDay.clone().startOf('isoWeek');
    let weekDays;

    const defaultWeekdays = Array(...Array(7)).map((_, i) => {
      weekDays = firstDay.clone().add(i, 'day');
      return (
        <li key={i} className={this.className(weekDays)}>
          {weekDays.format('ddd')}
          <p>{weekDays.format('DD')}</p>
        </li>
      );
    });

    return <ul className="days-labels">{defaultWeekdays}</ul>;
  };

  dividingLines = () => {
    const { hourHeight } = this.props;
    let pos = 0;
    const lines = Array(...Array(25)).map((_, i) => {
      pos += hourHeight;
      return <line key={i} x1="0" y1={pos} x2="100%" y2={pos} stroke="#e0edf9" strokeWidth="2" />;
    });
    return lines;
  };

  handleClick = date => () => {
    const { selectDay } = this.props;
    selectDay(date);
  };

  className = currentDay => {
    const { selectedDay } = this.props;
    return classNames({
      'calendar__selected-weekday':
        currentDay.format('YYYY-MM-DD') === selectedDay.format('YYYY-MM-DD'),
    });
  };

  render() {
    const {
      firstWeekDay,
      prevWeek,
      nextWeek,
      hourHeight,
      hours,
      setWrapperRef,
      windowWidth,
    } = this.props;
    return (
      <div>
        <div className="calendar-main calendar-main--mobile">
          <Navigation
            label={firstWeekDay.format('MMM')}
            digit={firstWeekDay.format('DD')}
            endOfWeek={firstWeekDay.clone().add(6, 'day')}
            handlePrevDateClick={prevWeek}
            handleNextDateClick={nextWeek}
          />
          <div className="calendar-main__content">
            {this.daysLabels()}
            <div className="calendar__content calendar__content--week" ref={setWrapperRef}>
              <ul className="calendar__hours-labels">{hours()}</ul>
              <div
                className="calendar__events calendar__events--week"
                style={{ height: hourHeight * 24 }}
              >
                {this.getDays()}
              </div>
            </div>
          </div>
          {windowWidth > 768 && (
            <div className="calendar__day-sidebar">
              <DaySidebar />
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  selectedDay: state.calendar.selectedDay.clone(),
  firstWeekDay: state.calendar.firstWeekDay.clone(),
  events: state.events.eventsList,
});
export default compose(
  connect(
    mapStateToProps,
    { prevWeek, nextWeek, selectDay }
  ),
  RenderEventsContainer,
  withWindowWidth
)(Week);

Week.propTypes = {
  // from connect
  events: PropTypes.array.isRequired,
  firstWeekDay: PropTypes.object.isRequired,
  prevWeek: PropTypes.func.isRequired,
  nextWeek: PropTypes.func.isRequired,
  selectDay: PropTypes.func.isRequired,
  selectedDay: PropTypes.object.isRequired,
  // from hoc
  setHeight: PropTypes.func.isRequired,
  startTime: PropTypes.func.isRequired,
  getHeight: PropTypes.func.isRequired,
  hourHeight: PropTypes.number.isRequired,
  hours: PropTypes.func.isRequired,
  setWrapperRef: PropTypes.func.isRequired,
  // form Context
  windowWidth: PropTypes.number.isRequired,
};
