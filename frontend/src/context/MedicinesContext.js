import { createContext, useReducer } from 'react'

export const MedicinesContext = createContext()

export const medicinesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MEDICINES':
      return { 
        medicines: action.payload 
      }
    case 'CREATE_MEDICINE':
      return { 
        medicines: [action.payload, ...state.medicines] 
      }
    default:
      return state
  }
}

export const MedicinesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(medicinesReducer, { 
    medicines: null
  })
  
  return (
    <MedicinesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </MedicinesContext.Provider>
  )
}