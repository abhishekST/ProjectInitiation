import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { revertAll } from '../../../store'

export interface ProjectOverallSummary {
  project_name: string
  project_type_id: number | null
  billing_type: number | null
  gov_category_id: number | null
  lifecycle_model_id: number | null
  project_domain: number[]
  project_component: string
  subProject: boolean
  parent_id: number[]
  primary_technology: number[]
  secondry_technology: number[]
  account_manager: number[]
  project_manager: number[]
  project_summary: string
  project_sow: number
}

const initialState: ProjectOverallSummary = {
  project_name: '',
  project_type_id: null,
  billing_type: null,
  gov_category_id: null,
  lifecycle_model_id: null,
  project_domain: [],
  project_component: JSON.stringify([]),
  subProject: false,
  parent_id: [],
  primary_technology: [],
  secondry_technology: [],
  account_manager: [],
  project_manager: [],
  project_summary: '',
  project_sow: 0
}

export const projectOverAllSummarySlice = createSlice({
  name: 'projectOverallSummary',
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    changeProjectName: (
      state,
      action: PayloadAction<{ project_name: string }>
    ) => {
      state.project_name = action.payload.project_name
    },
    changeProductPhase: (
      state,
      action: PayloadAction<{ project_type_id: number }>
    ) => {
      state.project_type_id = action.payload.project_type_id
    },
    changeProjectType: (
      state,
      action: PayloadAction<{ billing_type: number }>
    ) => {
      state.billing_type = action.payload.billing_type
    },
    changeProjectGovernanceModel: (
      state,
      action: PayloadAction<{ gov_category_id: number }>
    ) => {
      state.gov_category_id = action.payload.gov_category_id
    },
    changeProjectLifeCycle: (
      state,
      action: PayloadAction<{ lifecycle_model_id: number }>
    ) => {
      state.lifecycle_model_id = action.payload.lifecycle_model_id
    },
    changeProjectDomain: (
      state,
      action: PayloadAction<{ project_domain: number[] }>
    ) => {
      state.project_domain = action.payload.project_domain
    },
    changeProjectParameter: (
      state,
      action: PayloadAction<{ project_component: string }>
    ) => {
      state.project_component = action.payload.project_component
    },
    changeSubProject: (
      state,
      action: PayloadAction<{ subProject: boolean }>
    ) => {
      state.subProject = action.payload.subProject
    },
    changeParentId: (
      state,
      action: PayloadAction<{ parent_id: number[] }>
    ) => {
      state.parent_id = action.payload.parent_id
    },
    changePrimaryTechStack: (
      state,
      action: PayloadAction<{ primary_technology: number[] }>
    ) => {
      state.primary_technology = action.payload.primary_technology
    },
    changeSecondryTechStack: (
      state,
      action: PayloadAction<{ secondry_technology: number[] }>
    ) => {
      state.secondry_technology = action.payload.secondry_technology
    },
    changeAccountManagers: (
      state,
      action: PayloadAction<{ account_manager: number[] }>
    ) => {
      state.account_manager = action.payload.account_manager
    },
    changeProjectManagers: (
      state,
      action: PayloadAction<{ project_manager: number[] }>
    ) => {
      state.project_manager = action.payload.project_manager
    },
    changeProjectSummary: (
      state,
      action: PayloadAction<{ project_summary: string }>
    ) => {
      state.project_summary = action.payload.project_summary
    },
    changeProjectSow: (
      state,
      action: PayloadAction<{ project_sow: number }>
    ) => {
      state.project_sow = action.payload.project_sow
    }
  }
})

export const {
  changeProjectName,
  changeProjectType,
  changeProductPhase,
  changeProjectDomain,
  changePrimaryTechStack,
  changeProjectGovernanceModel,
  changeProjectLifeCycle,
  changeProjectManagers,
  changeProjectParameter,
  changeSecondryTechStack,
  changeSubProject,
  changeParentId,
  changeAccountManagers,
  changeProjectSummary,
  changeProjectSow
} = projectOverAllSummarySlice.actions

export default projectOverAllSummarySlice.reducer
