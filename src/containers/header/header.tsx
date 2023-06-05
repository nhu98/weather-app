import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/store/store';
import {
  HeaderContainer,
  HeaderIconsContainer,
  SearchElement,
  SearchIcon,
  SearchInput,
  SearchResult,
  Title,
} from './styled';
import DarkModeToggle from 'react-dark-mode-toggle';
import { toggleDarkMode } from '../../core/store/reducers/appReducer';
import { DebounceInput } from 'react-debounce-input';
import Suggestion from './suggestion';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { useClickOutside } from '../../core/hooks/useClickOutside';

export interface result {
  x: number; // lon
  y: number; // lat
  label: string; // formatted address
  bounds: [
    [number, number], // south, west - lat, lon
    [number, number] // north, east - lat, lon
  ];
  raw: any; // raw provider result
}

export const Header = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.app.darkMode);
  const searchTermRedux = useSelector(
    (state: RootState) => state.app.searchTerm
  );

  const suggestionRef = useRef(null);
  const [suggestions, setSuggestions] = useState<any>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const onSearchInputChanged = async (e: any) => {
    const searchTerm = e.target.value;
    if (!searchTerm) {
      return;
    }
    const fetchData = async () => {
      const provider = new OpenStreetMapProvider();
      const results = await provider.search({ query: searchTerm });
      setSuggestions(results);
    };

    await fetchData();
    setShowSuggestions(true);
  };

  useClickOutside(suggestionRef, () => setShowSuggestions(false));

  return (
    <>
      <HeaderContainer>
        <Title>React Weather</Title>
        <HeaderIconsContainer>
          <DarkModeToggle
            checked={isDarkMode}
            onChange={() => dispatch(toggleDarkMode())}
            size={60}
          />
        </HeaderIconsContainer>
      </HeaderContainer>

      <SearchElement>
        <SearchIcon />
        <DebounceInput
          element={SearchInput}
          debounceTimeout={300}
          onChange={onSearchInputChanged}
          placeholder="Search for location"
          value={searchTermRedux}
        />

        {showSuggestions && (
          <SearchResult ref={suggestionRef}>
            {suggestions?.slice(0, 6)?.map((s: result, i: number) => (
              <Suggestion
                key={i}
                label={s.label}
                hideSuggestionFn={() => {
                  setShowSuggestions(false);
                }}
                suggestion={s}
              />
            ))}
          </SearchResult>
        )}
      </SearchElement>
    </>
  );
};
