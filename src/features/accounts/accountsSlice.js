const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload, isLoading:false};
    case "account/withdrawl":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan === 0) {
        return {
          ...state,
          loan: action.payload.amount,
          loanPurpose: action.payload.loanPurpose,
          balance: state.balance + action.payload.amount,
        };
      }
      return state;
    case "account/payLoan":
      if (state.balance >= action.payload) {
        return {
          ...state,
          loan: state.loan - action.payload,
          loanPurpose: "",
          balance: state.balance - action.payload,
        };
      }
      throw new Error("Loan repay amount is greater than account balance");
    case "account/convertingCurrency" : 
      return {...state, isLoading:true}

    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({type:"account/convertingCurrency"})
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
    );
    const data = await res.json();
    const baseConvert = data.rates.USD;
    const converted = Number(baseConvert) * Number(amount);
    dispatch({ type: "account/deposit", payload: converted });
  };
}
export function withdrawl(amount) {
  return { type: "account/withdrawl", payload: amount };
}
export function requestLoan(amount, loanPurpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount: amount,
      loanPurpose: loanPurpose,
    },
  };
}
export function payLoan(amount) {
  return { type: "account/payLoan", payload: amount };
}
