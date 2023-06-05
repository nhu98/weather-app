import { useEffect, useRef, useState } from 'react';
import FlipMove from 'react-flip-move';
import WidgetWeather from './widget';
import {
  getDataWeather,
  setFirstWidgetData,
  setStayPosition,
} from '../../core/store/reducers/appReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/store/store';
import { WeatherModel } from '../../core/models';

export interface Widget {
  id: string;
  icon: string;
  description: string;
  temp: number;
  feels_like: number;
  country: string;
  localtime: string;
  name: string;
  humidity: number;
  pressure: number;
  wind_speed: number;
  index?: number;
}

const wrapperClass =
  'grid grid-cols-1 min-[840px]:grid-cols-2 min-[1180px]:grid-cols-3 min-[1520px]:grid-cols-4 gap-6 rounded-2xl p-8';
const itemClass = 'justify-self-center w-80 max-w-full ';

export default function WidgetList() {
  const dispatch = useDispatch();

  const weatherData = useSelector((state: RootState) => state.app.weatherData);

  const [widgets, setWidgets] = useState<WeatherModel[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const originalItems = useRef(widgets);
  const dragItemIndex = useRef(-1);
  const dragOverItemIndex = useRef(-1);

  const reOrderWidgets = () => {
    if (
      originalItems.current[dragItemIndex.current] ===
      widgets[dragOverItemIndex.current]
    )
      return;

    const newItems = [...originalItems.current];

    newItems.splice(
      dragOverItemIndex.current,
      0,
      newItems.splice(dragItemIndex.current, 1)[0]
    );
    setWidgets(newItems);
    dispatch(setFirstWidgetData(newItems[0]));
  };

  const getCurrentPosition = () => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  useEffect(() => {
    const getPosition = async () => {
      const position = await getCurrentPosition();
      dispatch(
        setStayPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(getDataWeather());
    };
    getPosition();
  }, []);

  const widgetIds = useRef(new Set());

  useEffect(() => {
    if (weatherData && weatherData.current) {
      if (!widgetIds.current.has(weatherData?.current.name)) {
        setWidgets((prev) => [weatherData, ...prev]);
        widgetIds.current.add(weatherData?.current.name);
        dispatch(setFirstWidgetData(weatherData));
      }
    }
  }, [weatherData]);

  return (
    <section onDragOver={(event) => event.preventDefault()}>
      <FlipMove className={`${wrapperClass}`}>
        {widgets?.map((item, index) => (
          <div
            key={item?.current.name}
            id={item?.current.name}
            className={`${itemClass} transition-opacity delay-[5ms] ${
              isDragging &&
              originalItems.current[dragItemIndex.current] === item
                ? 'opacity-0'
                : 'opacity-100'
            } rounded-3xl bg-white`}
          >
            <WidgetWeather {...item} index={index} />
          </div>
        ))}

        <div
          className={`${wrapperClass} absolute inset-0 flex flex-wrap gap-6`}
        >
          {widgets?.map((widget, index) => (
            <div
              key={widget?.current.name}
              className={`${itemClass} cursor-grab rounded-3xl`}
              draggable
              onDragStart={(event) => {
                originalItems.current = widgets;
                dragItemIndex.current = index;

                event.dataTransfer.effectAllowed = 'move';
                const draggedEl = document.getElementById(widget?.current.name);
                if (draggedEl) {
                  event.dataTransfer.setDragImage(
                    draggedEl,
                    event.nativeEvent.offsetX,
                    event.nativeEvent.offsetY
                  );
                }
                setIsDragging(true);
              }}
              onDragOver={() => {
                dragOverItemIndex.current = index;
                reOrderWidgets();
              }}
              onDragEnd={() => setIsDragging(false)}
            />
          ))}
        </div>
      </FlipMove>
    </section>
  );
}
