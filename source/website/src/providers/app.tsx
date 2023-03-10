import * as React from "react";
import { SnackbarProvider } from "notistack";
import { RecoilRoot } from "recoil";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import {
  Button,
  CircularProgress,
  Slide,
  CssBaseline,
  Backdrop,
} from "@mui/material";
import { queryClient } from "@/lib/react-query";

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
          >
            <CircularProgress />
          </Backdrop>
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              TransitionComponent={Slide}
            >
              <CssBaseline />
              <Router>{children}</Router>
            </SnackbarProvider>
          </QueryClientProvider>
        </RecoilRoot>
      </ErrorBoundary>
    </React.Suspense>
  );
};
