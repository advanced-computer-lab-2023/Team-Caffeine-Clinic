import { MedicinesContext } from "../context/MedicinesContext"
import { useContext } from "react"

export const useMedicinesContext = () => {
  const context = useContext(MedicinesContext)

  if(!context) {
    throw Error('Error');
  }

  return context
}