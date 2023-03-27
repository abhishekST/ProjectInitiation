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
  project_component: '[]',
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
      action: PayloadAction<{ projectName: string }>
    ) => {
      state.project_name = action.payload.projectName
    },
    changeProductPhase: (
      state,
      action: PayloadAction<{ projectPhase: number }>
    ) => {
      state.project_type_id = action.payload.projectPhase
    },
    changeProjectType: (
      state,
      action: PayloadAction<{ projectType: number }>
    ) => {
      state.billing_type = action.payload.projectType
    },
    changeProjectGovernanceModel: (
      state,
      action: PayloadAction<{ projectGovernanceModel: number }>
    ) => {
      state.gov_category_id = action.payload.projectGovernanceModel
    },
    changeProjectLifeCycle: (
      state,
      action: PayloadAction<{ projectLifeCycle: number }>
    ) => {
      state.lifecycle_model_id = action.payload.projectLifeCycle
    },
    changeProjectDomain: (
      state,
      action: PayloadAction<{ projectDomain: number[] }>
    ) => {
      state.project_domain = action.payload.projectDomain
    },
    changeProjectParameter: (
      state,
      action: PayloadAction<{ projectParameter: string }>
    ) => {
      state.project_component = action.payload.projectParameter
    },
    changeSubProject: (
      state,
      action: PayloadAction<{ subProject: boolean }>
    ) => {
      state.subProject = action.payload.subProject
    },
    changeParentId: (
      state,
      action: PayloadAction<{ parentId: number[] }>
    ) => {
      state.parent_id = action.payload.parentId
    },
    changePrimaryTechStack: (
      state,
      action: PayloadAction<{ primaryTechStack: number[] }>
    ) => {
      state.primary_technology = action.payload.primaryTechStack
    },
    changeSecondryTechStack: (
      state,
      action: PayloadAction<{ secondryTechStack: number[] }>
    ) => {
      state.secondry_technology = action.payload.secondryTechStack
    },
    changeAccountManagers: (
      state,
      action: PayloadAction<{ accountManagers: number[] }>
    ) => {
      state.account_manager = action.payload.accountManagers
    },
    changeProjectManagers: (
      state,
      action: PayloadAction<{ projectManagers: number[] }>
    ) => {
      state.project_manager = action.payload.projectManagers
    },
    changeProjectSummary: (
      state,
      action: PayloadAction<{ projectSummary: string }>
    ) => {
      state.project_summary = action.payload.projectSummary
    },
    changeProjectSow: (
      state,
      action: PayloadAction<{ projectSow: number }>
    ) => {
      state.project_sow = action.payload.projectSow
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
