import { configureStore } from '@reduxjs/toolkit'
import ClientInfoReducer from '../pages/ProjectInit/ClientInformation/reducer'
import ProjectOverAllSummaryReducer from '../pages/ProjectInit/ProjectOverAllSummary/reducer'
import TimelineAndFundingReducer from '../pages/ProjectInit/TimelineAndFunding/reducer'

export const store = configureStore({
  reducer: {
    clientInfo: ClientInfoReducer,
    projectOverAllSummary: ProjectOverAllSummaryReducer,
    timelineAndFunding: TimelineAndFundingReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
