import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { revertAll } from '../../../store'
import { clientInfoValidationSchema } from './validationSchema'

export interface client {
  id: number
  name: string
  emails: string
}

interface clientError {
  address: undefined | string
  client: undefined | string
  country: undefined | string
  state: undefined | string
  company: undefined | string
}

export interface ClientInformationState {
  address: string
  client: client[]
  country: string
  company: string
  state: string
  errors: clientError
}

const initialState: ClientInformationState = {
  address: '',
  client: [],
  country: '',
  company: '',
  state: '',
  errors: {
    address: undefined,
    client: undefined,
    country: undefined,
    state: undefined,
    company: undefined
  }
}

export const clientInformationSlice = createSlice({
  name: 'clientInformation',
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    changeClient: (state, action: PayloadAction<{ clients: client[] }>) => {
      state.client = action.payload.clients
    },
    changeClientAddress: (
      state,
      action: PayloadAction<{ address: string }>
    ) => {
      state.address = action.payload.address
    },
    changeClientCountry: (
      state,
      action: PayloadAction<{ country: string }>
    ) => {
      state.country = action.payload.country
    },
    changeClientCompany: (
      state,
      action: PayloadAction<{ company: string }>
    ) => {
      state.company = action.payload.company
    },
    changeClientState: (state, action: PayloadAction<{ state: string }>) => {
      state.state = action.payload.state
    },
    validateField: (state, action: PayloadAction<{ field: string }>) => {
      const { field } = action.payload
      try {
        clientInfoValidationSchema().validateSyncAt(field, state)
        const newError = { ...state.errors, [field]: undefined }
        state.errors = newError
      } catch (error: any) {
        const newError = { ...state.errors, [field]: error.message }
        state.errors = newError
      }
    }
  }
})

export const {
  changeClient,
  changeClientAddress,
  changeClientCountry,
  changeClientState,
  changeClientCompany,
  validateField
} = clientInformationSlice.actions

export default clientInformationSlice.reducer
