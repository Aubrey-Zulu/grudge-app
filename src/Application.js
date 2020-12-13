import React, { useReducer, useCallback } from 'react';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';
const Application = () => {
  return (
    <div className="Application">
      <NewGrudge />
      <section>
        <button>undo</button>
        <button>redo</button>
      </section>
      <Grudges />
    </div>
  );
};

export default Application;
