import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { revertAll } from '../../../store'

export interface TimelineAndFunding {
  startDate: Date | null
  endDate: Date | null
  noOfDays: number
  totalApprovedHours: number
  projectBilling: string
  billingFrequency: string
}

const initialState: TimelineAndFunding = {
  startDate: null,
  endDate: null,
  noOfDays: 0,
  totalApprovedHours: 0,
  projectBilling: '',
  billingFrequency: ''
}

export const timelineAndFundingSlice = createSlice({
  name: 'timelin2023eAndFunding',
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    changeStartDate: (
      state,
      action: PayloadAction<{ startDate: Date | null }>
    ) => {
      state.startDate = action.payload.startDate
    },
    changeEndDate: (
      state,
      action: PayloadAction<{ endDate: Date | null }>
    ) => {
      state.endDate = action.payload.endDate
    },
    changeNoOfDays: (
      state,
      action: PayloadAction<{ noOfDays: number }>
    ) => {
      state.noOfDays = action.payload.noOfDays
    },
    changeTotalApprovedHours: (
      state,
      action: PayloadAction<{ totalApprovedHours: number }>
    ) => {
      state.totalApprovedHours = action.payload.totalApprovedHours
    },
    changeClientCompany: (
      state,
      action: PayloadAction<{ totalApprovedHours: number }>
    ) => {
      state.totalApprovedHours = action.payload.totalApprovedHours
    },
    changeProjectBilling: (
      state,
      action: PayloadAction<{ projectBilling: string }>
    ) => {
      state.projectBilling = action.payload.projectBilling
    },
    changeBillingFrequency: (
      state,
      action: PayloadAction<{ billingFrequency: string }>
    ) => {
      state.billingFrequency = action.payload.billingFrequency
    }
  }
})

export const {
  changeBillingFrequency,
  changeClientCompany,
  changeEndDate,
  changeNoOfDays,
  changeProjectBilling,
  changeStartDate,
  changeTotalApprovedHours
} = timelineAndFundingSlice.actions

export default timelineAndFundingSlice.reducer
