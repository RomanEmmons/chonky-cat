import React from 'react';
import ListItem from './ListItem.jsx';

const List = props => (
  <div className="List">
    {console.log('props in List', props)}

    {props.cats !== null
      ? props.cats.map(cat =>
          cat.photos.length > 0 ? <ListItem key={cat.id} cat={cat} /> : null
        )
      : null}
  </div>
);

export default List;
