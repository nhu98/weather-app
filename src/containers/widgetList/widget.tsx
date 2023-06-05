import { WeatherModel } from '../../core/models';

interface ComponentProps {
  index: number;
}

type Props = ComponentProps & WeatherModel;

export default function WidgetWeather({ current, index }: Props) {
  return (
    <div
      className={`card w-auto shadow-xl rounded-3xl p-6 h-full ${
        index === 0 && `border-solid border-2 border-sky-500`
      } `}
    >
      <div className="flex flex-row mb-10">
        <figure>
          <img
            src={current.conditions.icon}
            alt={current.name}
            style={{ width: '120px' }}
          />
        </figure>
        <div className="ml-10">
          <div className="text-secondary text-2xl font-bold">
            {current.localtime}
          </div>
          <p>
            {current.country}, {current.name}
          </p>
        </div>
      </div>

      <div className="card-body bg-base-100 flex flex-row ">
        <div className="mr-1">
          <h2 className="card-title text-secondary text-2xl font-bold">
            {current.temp_c}°C
          </h2>
          <p>{current.conditions.text}</p>

          <div className="card-actions justify-between items-center">
            <div className="text-secondary text-xl">
              {current.temp_c}°C / {current.feelslike_c}°C
            </div>
          </div>
        </div>

        <div>
          <p>Humidity: {current.humidity}</p>
          <p>Pressure: {current.pressure_mb}</p>
          <p>wind speed: {current.wind_kph}</p>
        </div>
      </div>
    </div>
  );
}
