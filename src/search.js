import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SearchBox(props) {
  return (
    <div style={{ width: "100%", padding: "12px" }}>
      <Autocomplete
        id="free-solo-demo"
        autoComplete
        freeSolo
        SearchBox
        options={props.arr.map((option) => option.title)}
        renderInput={(params) => (
          <TextField {...params} placeholder="Pesquisar" margin="none" variant="filled" />
        )}
      />
    </div>
  );
}