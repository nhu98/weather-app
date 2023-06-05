import * as React from 'react';
import { useDispatch } from 'react-redux';
import { SuggestionItem } from './styled';
import {
  getDataWeather,
  setStayPosition,
  setValueSearchTerm,
} from '../../core/store/reducers/appReducer';
import { result } from './header';

interface ISuggestionProps {
  label: string;
  hideSuggestionFn: Function;
  suggestion: result;
}

const Suggestion: React.FC<ISuggestionProps> = (props) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(
      setStayPosition({
        lat: props.suggestion.y,
        lng: props.suggestion.x,
      })
    );

    dispatch(setValueSearchTerm(props.label.split(',')[0]));

    setTimeout(() => {
      // @ts-ignore
      dispatch(getDataWeather());
      props.hideSuggestionFn();
    }, 400);
  };

  return <SuggestionItem onClick={onClick}>{props.label}</SuggestionItem>;
};

export default Suggestion;
