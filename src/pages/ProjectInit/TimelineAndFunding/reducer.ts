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
      action: PayloadAction<{ estimated_timeline_from: string | null }>
    ) => {
      state.estimated_timeline_from = action.payload.estimated_timeline_from
    },
    changeEndDate: (
      state,
      action: PayloadAction<{ estimated_timeline_to: string | null }>
    ) => {
      state.estimated_timeline_to = action.payload.estimated_timeline_to
    },
    changeProjectBilling: (
      state,
      action: PayloadAction<{ billing_medium: number }>
    ) => {
      state.billing_medium = action.payload.billing_medium
    },
    changeBillingFrequency: (
      state,
      action: PayloadAction<{ billing_interval: number }>
    ) => {
      state.billing_interval = action.payload.billing_interval
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
