import { WeatherModel } from '../../core/models';
import { FaTimes } from 'react-icons/fa';

interface ComponentProps {
  index: number;
  onDelete: (index: number) => void;
}

type Props = ComponentProps & WeatherModel;

export default function WidgetWeather({ current, index, onDelete }: Props) {
  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <div
      className={`card w-auto shadow-xl rounded-3xl p-6 h-full ${
        index === 0 && `border-solid border-2 border-sky-500`
      } `}
      style={{ position: 'relative' }}
    >
      <button
        className="delete-button"
        onClick={handleDelete}
        style={{
          color: 'rgb(123, 152, 178)',
          cursor: 'pointer',
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '1.5rem',
          zIndex: 1000,
        }}
      >
        <FaTimes />
      </button>
      <div className="flex flex-row mb-10">
        <figure>
          <img
            src={current.conditions.icon}
            alt={current.name}
            style={{ width: '120px' }}
          />
        </figure>
        <div
          className="ml-10"
          style={{ fontWeight: 600, color: 'rgb(57, 107, 174)' }}
        >
          <div className="text-secondary text-1xl font-bold">
            {current.localtime.slice(0, 11)}
          </div>
          <div className="text-secondary text-2xl font-bold">
            {current.localtime.slice(11, 16)}
          </div>
          <p>
            {current.country}, {current.name}
          </p>
        </div>
      </div>

      <div className="card-body bg-base-100 flex flex-row justify-between ">
        <div
          className="mr-1"
          style={{ fontWeight: 500, color: 'rgb(58, 134, 202)' }}
        >
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
          <p style={{ color: 'rgb(48, 128, 200)' }}>
            <span style={{ color: 'rgb(123, 152, 178)' }}>Humidity:</span>{' '}
            {current.humidity}
          </p>
          <p style={{ color: 'rgb(48, 128, 200)' }}>
            <span style={{ color: 'rgb(123, 152, 178)' }}>Pressure:</span>{' '}
            {current.pressure_mb}
          </p>
          <p style={{ color: 'rgb(48, 128, 200)' }}>
            <span style={{ color: 'rgb(123, 152, 178)' }}>wind speed:</span>{' '}
            {current.wind_kph}
          </p>
        </div>
      </div>
    </div>
  );
}
