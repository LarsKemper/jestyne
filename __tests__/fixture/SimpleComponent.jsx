import React from 'react';

function SimpleComponent() {
  function simpleFunction(number) {
    return number + 1;
  }

  return <div>SimpleComponent: {simpleFunction(2)}</div>;
}

export default SimpleComponent;
