import React, { useReducer, useCallback, createContext } from 'react';
import initialState from './initialState';
import id from 'uuid/v4';

export const GrudgeContext = createContext();

const markForgiven = (state, payload) => {
  return state.map((grudge) => {
    if (grudge.id === payload.id) {
      return { ...grudge, forgiven: !grudge.forgiven };
    }
    return grudge;
  });
};

//  Grudge Actions
const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';
const UNDO = 'UNDO';

const defaultState = {
  past: [],
  present: initialState,
  future: []
};

// Grudge  Reducer
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GRUDGE_ADD:
      return {
        past: [...state.present, ...state.past],
        present: [
          {
            id: id(),
            ...action.payload
          },
          ...state.present
        ],
        future: []
      };

    case GRUDGE_FORGIVE:
      return {
        past: [...state.present, ...state.past],
        present: state.present.filter(
          (grudge) => grudge.id !== action.payload.id
        ),
        future: []
      };

    default:
      return state;
  }
};

const GrudgeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const grudges = state.present;
  const isPast = !!state.past.length;
  const isFuture = !!state.future.length;
  const addGrudge = useCallback(
    ({ person, reason }) => {
      dispatch({
        type: GRUDGE_ADD,
        payload: { person, reason, forgiven: false, id: id() }
      });
    },
    [dispatch]
  );

  const toggleForgiveness = useCallback(
    (id) => {
      dispatch({ type: GRUDGE_FORGIVE, payload: { id } });
    },
    [dispatch]
  );

  const undo = useCallback(() => {
    dispatch({ type: UNDO });
  }, [dispatch]);
  const value = {
    grudges,
    addGrudge,
    toggleForgiveness,
    undo,
    isPast,
    isFuture
  };
  return (
    <GrudgeContext.Provider value={value}>{children}</GrudgeContext.Provider>
  );
};

export default GrudgeProvider;
