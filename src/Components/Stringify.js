import React from 'react';

export default function Stringify({ children }) {
  console.log(children);
  return <pre>{JSON.stringify(children, null, 2)}</pre>;
}
