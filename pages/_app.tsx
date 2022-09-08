import "../styles/globals.css";
import type { AppProps } from "next/app";
import { FavouritesProvider } from "../utils/favouritesContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FavouritesProvider>
      <Component {...pageProps} />
    </FavouritesProvider>
  );
}

export default MyApp;
