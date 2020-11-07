import {
  GET_PRODUCTS,
  ADD_PRODUCTS,
  DELETE_PRODUCTS,
  EDIT_PRODUCTS,
} from "../Actions/action-type";
const initState = { Inventory: [], loading: true };

export const Inventory = (state = initState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { Inventory: action.payload, loading: false };
    case ADD_PRODUCTS:
      return {
        Inventory: [
          ...state.Inventory,
          {
            product: action.product,
            quantity: action.quantity,
            price: action.price,
            id: action.id,
          },
        ],
        loading: false,
      };
    case DELETE_PRODUCTS:
      return {
        Inventory: [
          ...state.Inventory.filter((product) => product.id !== action.id),
        ],
      };
    case EDIT_PRODUCTS:
      return {
        Inventory: [
          ...state.Inventory.map((item) => {
            if (item.id === action.id) {
              return {
                product: action.product,
                quantity: action.quantity,
                price: action.price,
                id: action.id,
              };
            } else {
              return item;
            }
          }),
        ],
        loading: false,
      };
    default:
      return state;
  }
};
