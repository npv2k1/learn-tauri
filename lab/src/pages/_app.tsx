import { ReactElement } from "react";

import AppContextProvider from "@/contexts/AppContext";
import { AppPropsWithLayout } from "@/types";

import "@/styles/globals.css";

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <AppContextProvider>
      {getLayout(<Component {...pageProps} />)}
    </AppContextProvider>
  );
};
export default App;
