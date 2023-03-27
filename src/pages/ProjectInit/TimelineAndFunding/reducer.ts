import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { revertAll } from '../../../store'

export interface TimelineAndFunding {
  estimated_timeline_from: string | null
  estimated_timeline_to: string | null
  approved_hours: string | null
  billing_medium: number | null
  billing_interval: number | null
}

const initialState: TimelineAndFunding = {
  estimated_timeline_from: null,
  estimated_timeline_to: null,
  approved_hours: '0',
  billing_medium: null,
  billing_interval: null
}

export const timelineAndFundingSlice = createSlice({
  name: 'timelin2023eAndFunding',
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    changeStartDate: (
      state,
      action: PayloadAction<{ startDate: string | null }>
    ) => {
      state.estimated_timeline_from = action.payload.startDate
    },
    changeEndDate: (
      state,
      action: PayloadAction<{ endDate: string | null }>
    ) => {
      state.estimated_timeline_to = action.payload.endDate
    },
    changeProjectBilling: (
      state,
      action: PayloadAction<{ projectBilling: number }>
    ) => {
      state.billing_medium = action.payload.projectBilling
    },
    changeBillingFrequency: (
      state,
      action: PayloadAction<{ billingFrequency: number }>
    ) => {
      state.billing_interval = action.payload.billingFrequency
    }
  }
})

export const {
  changeBillingFrequency,
  changeEndDate,
  changeProjectBilling,
  changeStartDate
} = timelineAndFundingSlice.actions

export default timelineAndFundingSlice.reducer
