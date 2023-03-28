import { configureStore, createAction } from '@reduxjs/toolkit'
import CompanyInfoReducer from '../pages/ProjectInit/CompanyInformation/reducer'
import ProjectOverAllSummaryReducer from '../pages/ProjectInit/ProjectOverAllSummary/reducer'
import TimelineAndFundingReducer from '../pages/ProjectInit/TimelineAndFunding/reducer'

export const revertAll = createAction('REVERT_ALL')

export const store = configureStore({
  reducer: {
    companyInfo: CompanyInfoReducer,
    projectOverAllSummary: ProjectOverAllSummaryReducer,
    timelineAndFunding: TimelineAndFundingReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
