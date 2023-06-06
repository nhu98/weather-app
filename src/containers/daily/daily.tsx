import './daily.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/store/store';
import { DailyWeatherModel } from '../../core/models';
import React, { useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

export const Daily = () => {
  const [selectedDays, setSelectedDays] = useState(5);

  const firstDataWeather = useSelector(
    (state: RootState) => state.app.firstWidgetData
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleSelectChange = (event) => {
    const selectedValue = parseInt(event.target.value);
    setSelectedDays(selectedValue);
  };

  return (
    <>
      <label className="title">Daily</label>
      <div className="daiLyWrapper">
        <div className="flex flex-row">
          <h6 className="mr-3" style={{ color: 'rgb(114, 126, 142)' }}>
            Show X-day:
          </h6>
          <select
            value={selectedDays}
            onChange={handleSelectChange}
            style={{ color: 'rgb(114, 126, 142)' }}
          >
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="dailyContainer">
          <ScrollContainer>
            {firstDataWeather?.forecast?.forecastday
              .slice(0, selectedDays)
              .map((d: DailyWeatherModel) => (
                <div className="dayItem">
                  <h6 className="text-center dayName">
                    {new Date(d.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                    })}
                  </h6>
                  <img
                    src={d.condition?.icon}
                    alt={d.date}
                    style={{ width: '120px' }}
                  />
                  <p className="text-center descriptionWeather">
                    {d.condition?.text}
                  </p>
                  <span className="text-center descriptionWeather">
                    {d.mintemp_c}°C / {d.maxtemp_c}°C
                  </span>
                </div>
              ))}
          </ScrollContainer>
        </div>
      </div>
    </>
  );
};
