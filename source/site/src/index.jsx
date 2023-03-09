import { CssBaseline, Slide } from "@mui/material";
import App from "App";
import { enableMapSet } from "immer";
import { SnackbarProvider } from "notistack";
import { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from 'recoil'
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
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </SnackbarProvider>
  </Fragment>
);
