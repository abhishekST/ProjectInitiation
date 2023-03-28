import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { revertAll } from '../../../store'
import { clientInfoValidationSchema } from './validationSchema'

interface companyError {
  address: undefined | string
  client_detail: undefined | string
  country: undefined | string
  state: undefined | string
  company: undefined | string
}

export interface CompanyInformationState {
  address: string
  client_detail: number[]
  country: string
  company: string
  state: string
  errors: companyError
}

const initialState: CompanyInformationState = {
  address: '',
  client_detail: [],
  country: '',
  company: '',
  state: '',
  errors: {
    address: undefined,
    client_detail: undefined,
    country: undefined,
    state: undefined,
    company: undefined
  }
}

export const companyInformationSlice = createSlice({
  name: 'companyInformation',
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    changeClient: (state, action: PayloadAction<{ client_detail: number[] }>) => {
      state.client_detail = action.payload.client_detail
    },
    changeCompanyAddress: (
      state,
      action: PayloadAction<{ address: string }>
    ) => {
      state.address = action.payload.address
    },
    changeCompanyCountry: (
      state,
      action: PayloadAction<{ country: string }>
    ) => {
      state.country = action.payload.country
    },
    changeCompany: (
      state,
      action: PayloadAction<{ company: string }>
    ) => {
      state.company = action.payload.company
    },
    changeCompanyState: (state, action: PayloadAction<{ state: string }>) => {
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
  changeCompanyAddress,
  changeCompanyCountry,
  changeCompanyState,
  changeCompany,
  validateField
} = companyInformationSlice.actions

export default companyInformationSlice.reducer
