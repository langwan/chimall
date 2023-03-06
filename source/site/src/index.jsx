import { CssBaseline, Slide } from "@mui/material";
import App from "App";
import { enableMapSet } from "immer";
import { SnackbarProvider } from "notistack";
import { Fragment } from "react";
import ReactDOM from "react-dom/client";
import "./Sass/index.scss";
enableMapSet();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Fragment>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      TransitionComponent={Slide}
    >
      <CssBaseline />
      <App />
    </SnackbarProvider>
  </Fragment>
);
