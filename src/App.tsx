import React from 'react';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';


import Header from './components/Header';
import InputForm from './components/InputForm';
import Introduct from './components/Introduction';

const myTheme = createTheme({
  palette:{
    primary: {
      light:"#6d84b4",
      main: "#3b5998",
      contrastText:"#d8dfea",
    },
    secondary: {
      main:"#3578e5",
      dark:"#3b5998",
      contrastText:"#ffffff",
    },
    text: {
      primary:"#333333"
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={myTheme}>
    <Grid container direction="column">
      <Header />
    <div style={{ padding: 30 }}>
      <Introduct />
      <InputForm />
    </div>
    </Grid>
    </ThemeProvider>
  );
}

export default App;
