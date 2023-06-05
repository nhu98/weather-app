import React from 'react';
import './HourlyItem.scss';
import { HourlyWeatherModel } from '../../core/models';

type HourlyItemProps = {
  data: HourlyWeatherModel;
};

export const HourlyItem = ({ data }: HourlyItemProps) => {
  return (
    <div className="hourly-item">
      <label className="hour">{data.time.slice(11, 16)}</label>
      <img
        src={data.condition.icon}
        alt={data.time}
        style={{ width: '120px' }}
      />
      <label className="temp">{data.temp_c}°C</label>
    </div>
  );
};
export default HourlyItem;
