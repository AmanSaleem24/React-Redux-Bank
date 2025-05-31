import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer(state, action) {
      state.fullName = action.payload.fullName;
      state.nationalID = action.payload.nationalID;
      state.createdAt = new Date().toISOString();
    },
    updateName(state, action){
      state.fullName = action.payload
    }
  },
});

console.log(customerSlice)

export const {createCustomer, updateName} = customerSlice.actions
export default customerSlice.reducer
/*
export default function customerReducer(state = initiaStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: new Date().toISOString(),
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
}
export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName: fullName, nationalID: nationalID },
  };
}

export function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}
  */
