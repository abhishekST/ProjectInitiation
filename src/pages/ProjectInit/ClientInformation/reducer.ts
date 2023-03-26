import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { revertAll } from '../../../store'

export interface client {
  id: number
  name: string
  emails: string
}

export interface ClientInformationState {
  address: string
  client: client[]
  country: string
  company: string
  state: string
}

const initialState: ClientInformationState = {
  address: '',
  client: [],
  country: '',
  company: '',
  state: ''
}

export const clientInformationSlice = createSlice({
  name: 'clientInformation',
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    changeClient: (
      state,
      action: PayloadAction<{ clients: client[] }>
    ) => {
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
    changeClientState: (
      state,
      action: PayloadAction<{ state: string }>
    ) => {
      state.state = action.payload.state
    }
  }
})

export const {
  changeClient,
  changeClientAddress,
  changeClientCountry,
  changeClientState,
  changeClientCompany
} = clientInformationSlice.actions

export default clientInformationSlice.reducer
