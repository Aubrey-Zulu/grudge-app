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

// Grudge  Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case GRUDGE_ADD:
      return [...state, action.payload];

    case GRUDGE_FORGIVE:
      return markForgiven(state, action.payload);

    default:
      return state;
  }
};

const GrudgeProvider = ({ children }) => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

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
  const value = { grudges, addGrudge, toggleForgiveness };
  return (
    <GrudgeContext.Provider value={value}>{children}</GrudgeContext.Provider>
  );
};

export default GrudgeProvider;
