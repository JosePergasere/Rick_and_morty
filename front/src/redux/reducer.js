import {
  ORDER,
  FILTER,
  GET_CHARACTER_DETAIL,
  CLEAN_DETAIL,
  GET_FAVORITES,
} from "./action-types";

//! Inicializar el Estado Global
const initialState = {
  myFavorites: [],
  allCharacters: [],
  characterDetail: {},
};

//! Reducer: Devuelve un nuevo (si no hay algun error)Estado actualizado de la APP
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER:
      const { allCharacters } = state;

      if (action.payload !== "All characters") {
        let myFavoritesAux = allCharacters.filter(
          (char) => char.gender === action.payload
        );

        return {
          ...state,
          myFavorites: myFavoritesAux,
        };
      }

      return {
        ...state,
        myFavorites: [...allCharacters],
      };

    case ORDER:
      return {
        ...state,
        myFavorites:
          action.payload === "Ascendente"
            ? state.myFavorites.sort((a, b) => a.id - b.id)
            : state.myFavorites.sort((a, b) => b.id - a.id),
      };
    case GET_CHARACTER_DETAIL:
      return {
        ...state,
        characterDetail: action.payload,
      };

    case CLEAN_DETAIL:
      return {
        ...state,
        characterDetail: {},
      };

    case GET_FAVORITES:
      return {
        ...state,
        myFavorites: action.payload,
        allCharacters: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
