import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AccountManager {
  id: number
  name: string
  email: string
}

export interface ProjectManager {
  id: number
  name: string
  email: string
}

export interface ProjectOverallSummary {
  projectName: string
  projectPhase: string
  projectType: string
  projectGovernanceModel: string
  projectLifeCycle: string
  projectDomain: string[]
  projectParameter: string[]
  subProject: string[]
  primaryTechStack: string[]
  secondryTechStack: string[]
  accountManagers: AccountManager[]
  projectManagers: ProjectManager[]
  projectSummary: string
  projectSow: string
}

const initialState: ProjectOverallSummary = {
  projectName: '',
  projectPhase: '',
  projectType: '',
  projectGovernanceModel: '',
  projectLifeCycle: '',
  projectDomain: [],
  projectParameter: [],
  subProject: [],
  primaryTechStack: [],
  secondryTechStack: [],
  accountManagers: [],
  projectManagers: [],
  projectSummary: '',
  projectSow: ''
}

export const projectOverAllSummarySlice = createSlice({
  name: 'projectOverallSummary',
  initialState,
  reducers: {
    changeProjectName: (
      state,
      action: PayloadAction<{ projectName: string }>
    ) => {
      state.projectName = action.payload.projectName
    },
    changeProductPhase: (
      state,
      action: PayloadAction<{ projectPhase: string }>
    ) => {
      state.projectPhase = action.payload.projectPhase
    },
    changeProjectType: (
      state,
      action: PayloadAction<{ projectType: string }>
    ) => {
      state.projectType = action.payload.projectType
    },
    changeProjectGovernanceModel: (
      state,
      action: PayloadAction<{ projectGovernanceModel: string }>
    ) => {
      state.projectGovernanceModel = action.payload.projectGovernanceModel
    },
    changeProjectLifeCycle: (
      state,
      action: PayloadAction<{ projectLifeCycle: string }>
    ) => {
      state.projectLifeCycle = action.payload.projectLifeCycle
    },
    changeProjectDomain: (
      state,
      action: PayloadAction<{ projectDomain: string[] }>
    ) => {
      state.projectDomain = action.payload.projectDomain
    },
    changeProjectParameter: (
      state,
      action: PayloadAction<{ projectParameter: string[] }>
    ) => {
      state.projectParameter = action.payload.projectParameter
    },
    changeSubProject: (
      state,
      action: PayloadAction<{ subProject: string[] }>
    ) => {
      state.subProject = action.payload.subProject
    },
    changePrimaryTechStack: (
      state,
      action: PayloadAction<{ primaryTechStack: string[] }>
    ) => {
      state.primaryTechStack = action.payload.primaryTechStack
    },
    changeSecondryTechStack: (
      state,
      action: PayloadAction<{ secondryTechStack: string[] }>
    ) => {
      state.secondryTechStack = action.payload.secondryTechStack
    },
    changeAccountManagers: (
      state,
      action: PayloadAction<{ accountManagers: AccountManager[] }>
    ) => {
      state.accountManagers = action.payload.accountManagers
    },
    changeProjectManagers: (
      state,
      action: PayloadAction<{ projectManagers: ProjectManager[] }>
    ) => {
      state.projectManagers = action.payload.projectManagers
    },
    changeProjectSummary: (
      state,
      action: PayloadAction<{ projectSummary: string }>
    ) => {
      state.projectSummary = action.payload.projectSummary
    },
    changeProjectSow: (
      state,
      action: PayloadAction<{ projectSow: string }>
    ) => {
      state.projectSow = action.payload.projectSow
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
  changeAccountManagers,
  changeProjectSummary,
  changeProjectSow
} = projectOverAllSummarySlice.actions

export default projectOverAllSummarySlice.reducer
