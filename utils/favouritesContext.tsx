import {
  createContext,
  Dispatch,
  ReactElement,
  useContext,
  useReducer,
} from "react";
import { cloneDeep } from "lodash";
import { saveStateToLocalStorage } from "./localStorage";
import { LOCAL_STORAGE_KEY_FAVOURITES } from "../constants/global";

export type ContextAction = {
  type: keyof typeof ACTIONS;
  id?: string;
  ids?: string[];
};

export type ContextState = {
  ids: string[];
};

export interface ContextProps {
  favouritesData: ContextState;
  favouritesDispatch: Dispatch<ContextAction>;
}

export enum ACTIONS {
  UPDATE_FAVOURITES = "UPDATE_FAVOURITES",
  TOGGLE_FAVOURITE = "TOGGLE_FAVOURITE",
}
export type ContextProviderProps = {
  children: React.ReactNode;
};

export const FavouritesContext = createContext({} as ContextProps);

export function favouritesReducer(
  state: ContextState,
  action: ContextAction
): ContextState {
  const { type, id, ids } = action;
  switch (type) {
    /** Use this to update whole array of values */
    case ACTIONS.UPDATE_FAVOURITES: {
      if (!ids) return state;
      return {
        ...state,
        ids,
      };
    }

    /** Use this to toggle single id on the list */
    case ACTIONS.TOGGLE_FAVOURITE: {
      if (!id) return state;
      const newIds = cloneDeep(state.ids);

      if (newIds.includes(id)) {
        newIds.splice(newIds.indexOf(id), 1);
      } else {
        newIds.push(id);
      }

      saveStateToLocalStorage(LOCAL_STORAGE_KEY_FAVOURITES, newIds);
      return {
        ...state,
        ids: newIds,
      };
    }

    default:
      return state;
  }
}

const FavouritesProvider = ({
  children,
}: ContextProviderProps): ReactElement => {
  const [favouritesData, favouritesDispatch] = useReducer(favouritesReducer, {
    ids: [],
  });
  const value = { favouritesData, favouritesDispatch };
  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

const useFavourites = () => {
  const context = useContext(FavouritesContext);

  if (context === undefined) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }

  const updateFavourites = (ids: string[]): void => {
    context.favouritesDispatch({ type: ACTIONS.UPDATE_FAVOURITES, ids });
  };

  const toggleFavourite = (id: string): void => {
    context.favouritesDispatch({ type: ACTIONS.TOGGLE_FAVOURITE, id });
  };

  return {
    ...context,
    updateFavourites,
    toggleFavourite,
  };
};

export { FavouritesProvider, useFavourites };
