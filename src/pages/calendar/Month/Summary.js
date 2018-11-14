import React from 'react';
import PropTypes from 'prop-types';
import { typesOptions, workingTime } from 'config';
import styled, { css } from 'styled-components';
import { getDaySummary } from 'utils/events';
import { withWindowWidth } from 'components/hocs/window-context';

const colors = { ...typesOptions, blank: 'rgb(245,245,245)' };

const Summary = ({ events, windowWidth }) => {
  const isDesktop = windowWidth > 576;
  const desktopRadius = 23.6;
  const mobileRadius = 16.8;
  const circlePerimeter = isDesktop ? desktopRadius * 2 * Math.PI : mobileRadius * 2 * Math.PI;
  const getEventWidth = num => `${(num * 100) / (workingTime + 30)}`;
  const getSvgLenght = num => `${(num / 100) * circlePerimeter}`;
  let eventsSummary = {};
  let offset = 0;
  let prevLength = 0;
  if (events.length) eventsSummary = { ...getDaySummary(events), blank: workingTime };
  return (
    <StyledSvg width={isDesktop ? 50 : 35.3} height={isDesktop ? 50 : 35.3}>
      {Object.keys(eventsSummary).map((type, i) => {
        const svgLenght = getSvgLenght(getEventWidth(eventsSummary[type]));
        offset += prevLength;
        const circle = (
          <StyledCircle
            key={i}
            cx="50%"
            cy="50%"
            stroke={colors[type]}
            strokeDasharray={`${svgLenght}, 157`}
            strokeDashoffset={-offset}
            strokeWidth={isDesktop ? 3 : 2}
            fill="none"
            radius={isDesktop ? desktopRadius : mobileRadius}
          />
        );
        prevLength = +svgLenght + 5;
        return circle;
      })}
      {events.length && (
        <WhiteCircle
          cx="50%"
          cy="50%"
          stroke="#fff"
          strokeDasharray="5, 157"
          strokeWidth={isDesktop ? 3 : 2}
          fill="none"
          radius={isDesktop ? desktopRadius : mobileRadius}
        />
      )}
    </StyledSvg>
  );
};

Summary.defaultProps = {
  events: [],
};
Summary.propTypes = {
  events: PropTypes.array,
  windowWidth: PropTypes.number.isRequired,
};

export default withWindowWidth(Summary);

const StyledSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
`;
const StyledCircle = styled.circle(
  ({ radius }) => css`
    r: ${radius};
    transform: rotate(-90deg);
    transform-origin: center;
  `
);
const WhiteCircle = styled.circle(
  ({ radius }) => css`
    r: ${radius};
    transform: rotate(-102deg);
    transform-origin: center;
  `
);