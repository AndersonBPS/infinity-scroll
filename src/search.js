import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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
          <TextField {...params} placeholder="Pesquisar" margin="none" variant="outlined" />
        )}
      />
    </div>
  );
}