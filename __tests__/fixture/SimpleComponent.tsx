import React from 'react';

export default function SimpleComponent() {
  function simpleFunction(number) {
    return number + 1;
  }

  return <div>SimpleComponent: {simpleFunction(2)}</div>;
}
