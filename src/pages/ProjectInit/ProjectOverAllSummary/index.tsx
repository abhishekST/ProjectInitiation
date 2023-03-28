import React, { useEffect } from 'react'

import {
  Box,
  InputLabel,
  TextField,
  Select,
  OutlinedInput,
  MenuItem,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Avatar
} from '@mui/material'
import { type Theme, useTheme } from '@mui/material/styles'
import Textarea from '@mui/joy/Textarea'
import CancelIcon from '@mui/icons-material/Cancel'
// import _without from 'lodash/without'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import { deepOrange } from '@mui/material/colors'
import { projectInitiaonMock } from '../mock'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../../store'
import {
  changeAccountManagers,
  changePrimaryTechStack,
  changeProductPhase,
  changeProjectDomain,
  changeProjectGovernanceModel,
  changeProjectLifeCycle,
  changeProjectName,
  changeProjectParameter,
  changeProjectType,
  changeSecondryTechStack,
  changeSubProject,
  changeProjectManagers,
  changeProjectSummary,
  changeProjectSow
} from './reducer'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
]

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getStyles (_name: string, _personName: any, theme: Theme) {
  // console.log('name : ', name)
  return {
    fontWeight: theme.typography.fontWeightMedium
  }
}

// personName.indexOf(name) === -1
// ? theme.typography.fontWeightRegular
// : theme.typography.fontWeightMedium,

const ProjectOverAllSummary = (): JSX.Element => {
  const { phaseData } = projectInitiaonMock
  const projectOverAllSummary = useSelector(
    (state: RootState) => state.projectOverAllSummary
  )
  const dispatch = useDispatch()
  const theme = useTheme()

  useEffect(() => {
    const timeoutIdForClient = setTimeout(() => {
      try{
        const [] = Promise.all([])
      } catch(error) {

      }
    }, 100)

    return () => {
      clearTimeout(timeoutIdForClient)
    }
  }, [])

  return (
    <>
      <Box sx={{ mt: 5 }}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '48%' }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="full-width-text-field"
            label="Project Name"
            placeholder="Enter Name"
            name="projectName"
            value={projectOverAllSummary.project_name}
            onChange={({ target: { value } }) => {
              dispatch(changeProjectName({ projectName: value }))
            }}
            margin="normal"
            fullWidth
          />
          <FormControl sx={{ m: 1, width: '48%' }} required>
            <InputLabel id="demo-multiple-name-label">Phase </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              // multiple
              value={projectOverAllSummary.project_type_id}
              name="phase"
              displayEmpty
              onChange={({ target: { value } }) => {
                if (value === null || typeof value === 'string') {
                  return
                }
                dispatch(changeProductPhase({ project_type_id: value }))
              }}
              input={<OutlinedInput label="Phase" />}
              MenuProps={MenuProps}
              // endAdornment={
              //   <IconButton
              //     sx={{
              //       visibility: (projectOverAllSummary.projectPhase.length > 0) ? 'visible' : 'hidden'
              //     }}
              //     onClick={(_e) => {
              //       handleClearClick('phase')
              //     }}
              //   >
              //     <ClearIcon />
              //   </IconButton>
              // }
            >
              {phaseData.map((itm) => (
                <MenuItem
                  key={itm.name}
                  value={itm.name}
                  style={getStyles(itm.name, 'userData', theme)}
                >
                  {itm.name}
                </MenuItem>
              ))}
              {/* <Button
                                color='success'
                                variant='contained'
                            >
                                Close
                            </Button> */}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: '48%' }} required>
            <InputLabel id="demo-multiple-name-label">Project Type</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              // multiple
              required
              value={projectOverAllSummary.billing_type}
              name="projectType"
              onChange={({ target: { value } }) => {
                if (typeof value === 'string' || value === null) {
                  return
                }
                dispatch(changeProjectType({ billing_type: value }))
              }}
              input={<OutlinedInput label="Project Type *" />}
              MenuProps={MenuProps}
              endAdornment={
                <IconButton
                  sx={{
                    visibility:
                      ((projectOverAllSummary?.billing_type) != null)
                        ? 'visible'
                        : 'hidden'
                  }}
                  // onClick={(_e) => {
                  //   handleClearClick('projectType')
                  // }}
                >
                  <ClearIcon />
                </IconButton>
              }
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, 'userData', theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: '48%' }} required>
            <InputLabel id="demo-multiple-name-label">
              Governance Model
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              // multiple
              value={projectOverAllSummary.gov_category_id}
              name="governanceModel"
              onChange={({ target: { value } }) => {
                if (typeof value === 'string' || value === null) {
                  return
                }
                dispatch(
                  changeProjectGovernanceModel({
                    gov_category_id: value
                  })
                )
              }}
              input={<OutlinedInput label="Governance Model" />}
              MenuProps={MenuProps}
              endAdornment={
                <IconButton
                  sx={{
                    visibility:
                      (projectOverAllSummary?.gov_category_id != null)
                        ? 'visible'
                        : 'hidden'
                  }}
                  // onClick={(_e) => {
                  //   handleClearClick('governanceModel')
                  // }}
                >
                  <ClearIcon />
                </IconButton>
              }
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, 'userData', theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: '48%' }}>
            <InputLabel id="demo-multiple-name-label">
              Project Lifecycle Model
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              // multiple
              value={projectOverAllSummary.lifecycle_model_id}
              name="projectLifeCycleModel"
              onChange={({ target: { value } }) => {
                if (typeof value === 'string' || value === null) {
                  return
                }
                dispatch(changeProjectLifeCycle({ lifecycle_model_id: value }))
              }}
              input={<OutlinedInput label="Project Lifecycle Model" />}
              MenuProps={MenuProps}
              endAdornment={
                <IconButton
                  sx={{
                    visibility:
                      (projectOverAllSummary.lifecycle_model_id != null)
                        ? 'visible'
                        : 'hidden'
                  }}
                  // onClick={(_e) => {
                  //   handleClearClick('projectLifeCycleModel')
                  // }}
                >
                  <ClearIcon />
                </IconButton>
              }
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, 'userData', theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: '48%' }} required>
            <InputLabel id="demo-multiple-name-label">
              Project Domain
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={projectOverAllSummary.project_domain}
              name="projectDomain"
              onChange={({ target: { value } }) => {
                if (typeof value === 'string') {
                  return
                }
                dispatch(changeProjectDomain({ project_domain: value }))
              }}
              input={<OutlinedInput label="Project Domain" />}
              MenuProps={MenuProps}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map(
                    (
                      value:
                      | boolean
                      | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                      >
                      | React.ReactFragment
                      | React.Key
                      | null
                      | undefined,
                      index
                    ) => (
                      <Chip
                        key={index}
                        label={value}
                        // onDelete={(e) => {
                        //   handleDelete(e, value, 'projectDomain')
                        // }}
                        deleteIcon={
                          <CancelIcon
                            onMouseDown={(event) => {
                              event.stopPropagation()
                            }}
                          />
                        }
                        // onClick={(_e) => {
                        //   handleDelete()
                        // }}
                      />
                    )
                  )}
                </Box>
              )}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, 'userData', theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: '48%' }} required>
            <InputLabel id="demo-multiple-name-label">Parameters</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={JSON.parse(projectOverAllSummary.project_component)}
              name="parameters"
              onChange={({ target: { value } }) => {
                if (typeof value === 'string') {
                  return
                }
                dispatch(changeProjectParameter({ project_component: value }))
              }}
              input={<OutlinedInput label="Parameters" />}
              MenuProps={MenuProps}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected?.map(
                    (
                      value:
                      | boolean
                      | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                      >
                      | React.ReactFragment
                      | React.Key
                      | null
                      | undefined,
                      index
                    ) => (
                      <Chip
                        key={index}
                        // onDelete={(e) => {
                        //   handleDelete(e, value, 'parameters')
                        // }}
                        deleteIcon={
                          <CancelIcon
                            onMouseDown={(event) => {
                              event.stopPropagation()
                            }}
                          />
                        }
                        // onClick={(_e) => {
                        //   handleDelete()
                        // }}
                        label={value}
                      />
                    )
                  )}
                </Box>
              )}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, 'userData', theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: '48%' }} required>
            <InputLabel id="demo-multiple-name-label">
              Add Sub - Project
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              disabled
              value={projectOverAllSummary.subProject}
              name="addSubProject"
              onChange={({ target: { value } }) => {
                if (typeof value === 'string') {
                  return
                }
                dispatch(changeSubProject({ subProject: value }))
              }}
              input={<OutlinedInput label="Add Sub - Project" />}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, 'userData', theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: '48%' }} required>
            <InputLabel id="demo-multiple-name-label">
              Primary Tech Stack
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={projectOverAllSummary.primary_technology}
              name="primaryTeckStack"
              onChange={({ target: { value } }) => {
                if (typeof value === 'string') {
                  return
                }
                dispatch(changePrimaryTechStack({ primary_technology: value }))
              }}
              input={<OutlinedInput label="Primary Tech Stack" />}
              MenuProps={MenuProps}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map(
                    (
                      value:
                      | boolean
                      | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                      >
                      | React.ReactFragment
                      | React.Key
                      | null
                      | undefined,
                      index
                    ) => (
                      <Chip
                        key={index}
                        label={value}
                        // onDelete={(e) => {
                        //   handleDelete(e, value, 'primaryTeckStack')
                        // }}
                        deleteIcon={
                          <CancelIcon
                            onMouseDown={(event) => {
                              event.stopPropagation()
                            }}
                          />
                        }
                        // onClick={(_e) => {
                        //   handleDelete()
                        // }}
                      />
                    )
                  )}
                </Box>
              )}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, 'userData', theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: '48%' }} required>
            <InputLabel id="demo-multiple-name-label">
              Secondary Tech Stack
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={projectOverAllSummary.secondry_technology}
              name="secondaryTeckStack"
              onChange={({ target: { value } }) => {
                if (typeof value === 'string') {
                  return
                }
                dispatch(changeSecondryTechStack({ secondry_technology: value }))
              }}
              input={<OutlinedInput label="Secondary Tech Stack" />}
              MenuProps={MenuProps}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map(
                    (
                      value:
                      | boolean
                      | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                      >
                      | React.ReactFragment
                      | React.Key
                      | null
                      | undefined,
                      index
                    ) => (
                      <Chip
                        key={index}
                        label={value}
                        // onDelete={(e) => {
                        //   handleDelete(e, value, 'secondaryTeckStack')
                        // }}
                        deleteIcon={
                          <CancelIcon
                            onMouseDown={(event) => {
                              event.stopPropagation()
                            }}
                          />
                        }
                        // onClick={(_e) => {
                        //   handleDelete()
                        // }}
                      />
                    )
                  )}
                </Box>
              )}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, 'userData', theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: '48%' }} required>
            <InputLabel id="demo-multiple-name-label">
              Account Managers
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={projectOverAllSummary.account_manager}
              name="accountManagers"
              onChange={({ target: { value } }) => {
                if (typeof value === 'string') {
                  return
                }
                dispatch(changeAccountManagers({ account_manager: value }))
              }}
              input={<OutlinedInput label="Account Managers" />}
              MenuProps={MenuProps}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value, index) => (
                    <Chip
                      avatar={
                        <Avatar
                          sx={{
                            width: 24,
                            height: 24,
                            bgcolor: deepOrange[400]
                          }}
                        >
                          N
                        </Avatar>
                      }
                      key={index}
                      variant="outlined"
                      clickable
                      // onDelete={(e) => {
                      //   handleDelete(e, value, 'accountManagers')
                      // }}
                      deleteIcon={
                        <CancelIcon
                          onMouseDown={(event) => {
                            event.stopPropagation()
                          }}
                        />
                      }
                      // onClick={(_e) => {
                      //   handleDelete()
                      // }}
                      sx={{ border: 'none' }}
                      label={
                        <div>
                          <Typography sx={{ mb: -1 }}>{value.name}</Typography>
                          <Typography variant="caption">
                            {value.email}
                          </Typography>
                        </div>
                      }
                    />
                  ))}
                </Box>
              )}
            >
              {phaseData.map((itm) => (
                // @ts-expect-error [1]
                <MenuItem
                  key={itm.id}
                  value={itm}
                  leftIcon={
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                  }
                  style={getStyles(itm.name, 'userData', theme)}
                >
                  <Avatar
                    sx={{
                      mr: 1,
                      width: 24,
                      height: 24,
                      bgcolor: deepOrange[400]
                    }}
                  >
                    N
                  </Avatar>
                  <div>
                    <Typography sx={{ mb: -1 }}>{itm.name}</Typography>
                    <Typography variant="caption">{itm.email}</Typography>
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: '48%' }} required>
            <InputLabel id="demo-multiple-name-label">
              Project Managers
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={projectOverAllSummary.project_manager}
              name="projectManagers"
              onChange={({ target: { value } }) => {
                if (typeof value === 'string') {
                  return
                }
                dispatch(changeProjectManagers({ project_manager: value }))
              }}
              input={<OutlinedInput label="Project Managers" />}
              MenuProps={MenuProps}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      avatar={
                        <Avatar
                          sx={{
                            width: 24,
                            height: 24,
                            bgcolor: deepOrange[400]
                          }}
                        >
                          N
                        </Avatar>
                      }
                      key={value.id}
                      variant="outlined"
                      clickable
                      // onDelete={(e) => {
                      //   handleDelete(e, value, 'projectManagers')
                      // }}
                      deleteIcon={
                        <CancelIcon
                          onMouseDown={(event) => {
                            event.stopPropagation()
                          }}
                        />
                      }
                      // onClick={(_e) => {
                      //   handleDelete()
                      // }}
                      sx={{ border: 'none' }}
                      label={
                        <div>
                          <Typography sx={{ mb: -1 }}>{value.name}</Typography>
                          <Typography variant="caption">
                            {value.email}
                          </Typography>
                        </div>
                      }
                    />
                  ))}
                </Box>
              )}
            >
              {phaseData.map((itm) => (
                // @ts-expect-error [1]
                <MenuItem
                  key={itm.id}
                  value={itm}
                  leftIcon={
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                  }
                  style={getStyles(itm.name, 'userData', theme)}
                >
                  <Avatar
                    sx={{
                      mr: 1,
                      width: 24,
                      height: 24,
                      bgcolor: deepOrange[400]
                    }}
                  >
                    N
                  </Avatar>
                  <div>
                    <Typography sx={{ mb: -1 }}>{itm.name}</Typography>
                    <Typography variant="caption">{itm.email}</Typography>
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: '48%' }} required>
            <FormLabel>Summary</FormLabel>
            <Textarea
              placeholder="Project Summary"
              minRows={2}
              value={projectOverAllSummary.project_summary}
              name="summary"
              onChange={({ target: { value } }) => {
                dispatch(changeProjectSummary({ project_summary: value }))
              }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, mt: 1, width: '48%' }} required>
            <FormLabel id="demo-row-radio-buttons-group-label">Sow</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => {
                dispatch(changeProjectSow({ project_sow: Number(e.target.value) }))
              }}
            >
              <Box
                sx={{
                  m: '5px',
                  pl: '10px',
                  border: '1px solid grey',
                  backgroundColor:
                    projectOverAllSummary.project_sow === 1
                      ? '#e6f2ff'
                      : 'white'
                }}
              >
                <FormControlLabel
                  value={1}
                  checked={projectOverAllSummary.project_sow === 1}
                  control={<Radio />}
                  label="Yes"
                />
              </Box>
              <Box
                sx={{
                  m: '5px',
                  pl: '10px',
                  border: '1px solid grey',
                  backgroundColor:
                    projectOverAllSummary.project_sow === 0
                      ? '#e6f2ff'
                      : 'white'
                }}
              >
                <FormControlLabel
                  value="no"
                  checked={projectOverAllSummary.project_sow === 0}
                  control={<Radio />}
                  label="No"
                />
              </Box>
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </>
  )
}

export default ProjectOverAllSummary
