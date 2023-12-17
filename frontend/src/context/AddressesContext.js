import { createContext, useReducer } from 'react'

export const AddressesContext = createContext()

export const addressesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ADDRESS':
      return { 
        addresses: action.payload 
      }
    case 'CREATE_ADDRESS':
      return { 
        addresses: [action.payload, ...state.addresses] 
      }
    default:
      return state
  }
}

export const AddressesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(addressesReducer, { 
    addresses: null
  })
  
  return (
    <AddressesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AddressesContext.Provider>
  )
}