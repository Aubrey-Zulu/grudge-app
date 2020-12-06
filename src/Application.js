import React, { useReducer, useCallback } from 'react';

import id from 'uuid/v4';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';

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

const Application = () => {
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

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
