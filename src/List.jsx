import React from 'react';
import ListItem from './ListItem.jsx';

const List = props => (
  <div className="List">
    {props.cats.map(cat => (
      <ListItem key={cat.id} cat={cat} />
    ))}
  </div>
);

export default List;
