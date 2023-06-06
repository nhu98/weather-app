import React from 'react';
import './Hourly.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/store/store';
import ScrollContainer from 'react-indiana-drag-scroll';
import HourlyItem from '../hourlyItem/HourlyItem';
import { HourlyWeatherModel } from '../../core/models';

export const Hourly = () => {
  const firstDataWeather = useSelector(
    (state: RootState) => state.app.firstWidgetData
  );

  return (
    <div className="hourly">
      <label className="title">Hourly</label>
      <div className="hourly-items-container mb-5">
        <ScrollContainer>
          {firstDataWeather.forecast?.forecastday[0].hour.map(
            (h: HourlyWeatherModel) => (
              <div
                key={h.condition.code}
                className={'hourly-item-container mb-10'}
              >
                <HourlyItem data={h} />
              </div>
            )
          )}
        </ScrollContainer>
      </div>
    </div>
  );
};

export default Hourly;
