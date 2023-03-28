import React, { Suspense } from 'react'
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  Chip,
  CssBaseline,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import {
  East,
  West,
  FilePresentOutlined,
  PermIdentityOutlined,
  RestorePageOutlined,
  AlarmOnOutlined,
  ArrowForwardIos
} from '@mui/icons-material'
import { styled } from '@mui/system'
import StepConnector, {
  stepConnectorClasses
} from '@mui/material/StepConnector'
import RefreshIcon from '@mui/icons-material/Refresh'

import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { revertAll } from '../../store'
const ProjectOverAllSummary = React.lazy(
  async () => await import('./ProjectOverAllSummary')
)
const ClientInformation = React.lazy(
  async () => await import('./CompanyInformation')
)
const TimelineAndFunding = React.lazy(
  async () => await import('./TimelineAndFunding')
)

const steps = [
  {
    step: 'Step1',
    detailStep: 'Client Information',
    chipLable: 'success',
    chipColor: 'success'
  },
  {
    step: 'Step2',
    detailStep: 'Detail & Parameters',
    chipLable: 'In Progress',
    chipColor: 'primary'
  },
  {
    step: 'Step3',
    detailStep: 'Timeline & Funding',
    chipLable: 'Pending',
    chipColor: 'default'
  }
]

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)'
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: 'blue'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: 'blue'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1
  }
}))

export const ProjectInitiation = (): JSX.Element => {
  const dispatch = useDispatch()
  const useStyles = makeStyles()(() => ({
    root: {
      height: '30px',
      width: '30px',
      backgroundColor: '#eaeaf0',
      padding: 3,
      display: 'inline-block',
      borderRadius: '50%'
    },
    active: {
      backgroundColor: 'blue',
      color: 'white'
    },
    completed: {
      backgroundColor: 'green',
      color: 'green'
    }
  }))
  const [age, setAge] = React.useState('')
  const [currentStep, setCurrentStep] = React.useState(1)
  const [isStep1Completed, setIsStep1Completed] = React.useState(false)
  const [isStep2Completed, setIsStep2Completed] = React.useState(false)
  const [isStep3Completed, setIsStep3Completed] = React.useState(false)

  const handleNext = (): void => {
    if (currentStep === 1) {
      setIsStep1Completed(true)
    }
    if (currentStep === 2) {
      setIsStep2Completed(true)
    }
    if (currentStep === 3) {
      setIsStep3Completed(true)
    }
    if (currentStep !== steps.length) {
      setCurrentStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = (): void => {
    setCurrentStep((prevActiveStep) => prevActiveStep - 1)
  }

  const { classes } = useStyles()

  const PermIdentityOutlinedIcon = (props: any): JSX.Element => {
    const { active, completed } = props
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed
        })}
      >
        {<PermIdentityOutlined />}
      </div>
    )
  }

  const RestorePageOutlinedIcon = (props: any): JSX.Element => {
    const { active, completed } = props
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed
        })}
      >
        <RestorePageOutlined />
      </div>
    )
  }

  const AlarmOnOutlinedIcon = (props: any): JSX.Element => {
    const { active, completed } = props
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed
        })}
      >
        <AlarmOnOutlined />
      </div>
    )
  }

  const resetFormData = (): void => {
    dispatch(revertAll())
    setCurrentStep(1)
  }

  return (
    <div>
      <Box sx={{ pb: 15, width: '100%' }}>
        <CssBaseline />
        <Box sx={{ display: 'flex', m: 1, mt: 4, mb: 5 }}>
          <Typography sx={{ ml: 1, fontSize: '15px', color: 'grey' }}>
            Home
          </Typography>
          <ArrowForwardIos sx={{ fontSize: '15px', m: '4px', color: 'grey' }} />
          <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
            Project Initiation
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            mt: -10
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Drafts</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={age}
              label="Draft"
              onChange={(e) => {
                setAge(e.target.value)
              }}
              sx={{ height: '38px', width: '120px' }}
            >
              <MenuItem value="draft">Draft</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', mb: 1 }}>
            <Button onClick={resetFormData} color="primary">
              <RefreshIcon />
              <u>RESET FORM</u>
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', m: 1, mb: 5 }}>
          <FilePresentOutlined />
          <Typography sx={{ ml: '5px', fontSize: '20px', fontWeight: 'bold' }}>
            Project Initiation
          </Typography>
        </Box>
        <Stepper
          activeStep={currentStep - 1}
          alternativeLabel
          connector={<QontoConnector />}
        >
          <Step
            sx={{ color: isStep1Completed ? 'green' : 'green' }}
            completed={isStep1Completed}
            key={steps[0].step}
          >
            <StepLabel
              StepIconComponent={
                !isStep1Completed ? PermIdentityOutlinedIcon : undefined
              }
              optional={
                <>
                  <Typography
                    sx={{ fontWeight: 'bold', color: 'black' }}
                    variant="subtitle2"
                  >
                    Client Information
                  </Typography>
                  <Chip
                    sx={{
                      borderRadius: 1,
                      backgroundColor: isStep1Completed ? '#e5f5ea' : '#eee',
                      color: isStep1Completed ? 'green' : 'blue'
                    }}
                    label={
                      isStep1Completed
                        ? 'completed'
                        : currentStep === 1
                          ? 'In Progress'
                          : 'Pending'
                    }
                    size="small"
                    variant="outlined"
                  />
                </>
              }
            >
              {steps[0].step}
            </StepLabel>
          </Step>
          <Step completed={isStep2Completed} key={steps[1].step}>
            <StepLabel
              StepIconComponent={
                !isStep2Completed ? RestorePageOutlinedIcon : undefined
              }
              optional={
                <>
                  <Typography
                    sx={{ fontWeight: 'bold', color: 'black' }}
                    variant="subtitle2"
                  >
                    Detail & Parameters
                  </Typography>
                  <Chip
                    sx={{
                      borderRadius: 1,
                      backgroundColor: isStep2Completed
                        ? '#e5f5ea'
                        : currentStep !== 2
                          ? '#e6e6e6'
                          : '#eee',
                      color: isStep2Completed
                        ? 'green'
                        : currentStep !== 2
                          ? 'grey'
                          : 'blue'
                    }}
                    label={
                      isStep2Completed
                        ? 'completed'
                        : currentStep === 2
                          ? 'In Progress'
                          : 'Pending'
                    }
                    size="small"
                    variant="outlined"
                  />
                </>
              }
            >
              {steps[1].step}
            </StepLabel>
          </Step>
          <Step completed={isStep3Completed} key={steps[2].step}>
            <StepLabel
              StepIconComponent={
                !isStep3Completed ? AlarmOnOutlinedIcon : undefined
              }
              optional={
                <>
                  <Typography
                    sx={{ fontWeight: 'bold', color: 'black' }}
                    variant="subtitle2"
                  >
                    Timeline & Funding
                  </Typography>
                  <Chip
                    sx={{
                      borderRadius: 1,
                      backgroundColor: isStep3Completed
                        ? '#e5f5ea'
                        : currentStep !== 3
                          ? '#e6e6e6'
                          : '#eee',
                      color: isStep3Completed
                        ? 'green'
                        : currentStep !== 3
                          ? 'grey'
                          : 'blue'
                    }}
                    label={
                      isStep3Completed
                        ? 'completed'
                        : currentStep === 3
                          ? 'In Progress'
                          : 'Pending'
                    }
                    size="small"
                    variant="outlined"
                  />
                </>
              }
            >
              {steps[2].step}
            </StepLabel>
          </Step>
        </Stepper>
        <Suspense>
          {currentStep === 1 && <ClientInformation />}
          {currentStep === 2 && <ProjectOverAllSummary />}
          {currentStep === 3 && <TimelineAndFunding />}
        </Suspense>
      </Box>

      <Paper
        style={{ backgroundColor: '#fafafa', zIndex: 1 }}
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '80px' }}
        elevation={5}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
          }}
        >
          {currentStep !== 1 && (
            <Button
              variant="outlined"
              startIcon={<West />}
              disabled={currentStep === 0}
              onClick={handleBack}
              sx={{ m: 2, mr: 1 }}
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            variant="contained"
            endIcon={currentStep !== steps.length ? <East /> : ''}
            sx={{ m: 2 }}
          >
            {currentStep === steps.length ? 'Submit' : 'Continue'}
          </Button>
        </Box>
      </Paper>
    </div>
  )
}
