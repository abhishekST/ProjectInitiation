import React from 'react'

import {
  Box,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../../store'
import {
  changeBillingFrequency,
  changeEndDate,
  changeNoOfDays,
  changeProjectBilling,
  changeStartDate,
  changeTotalApprovedHours
} from './reducer'

const TimelineAndFunding = (): JSX.Element => {
  const timelineAndFunding = useSelector(
    (state: RootState) => state.timelineAndFunding
  )
  const dispatch = useDispatch()

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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date *"
              value={timelineAndFunding.startDate}
              onChange={(value) => {
                dispatch(
                  changeStartDate({
                    startDate: value
                  })
                )
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date *"
              value={timelineAndFunding.endDate}
              onChange={(value) => {
                dispatch(
                  changeEndDate({
                    endDate: value
                  })
                )
              }}
            />
          </LocalizationProvider>
        </Box>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, mt: 3, width: '23.5%' }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="full-width-text-field"
            label="Number of days"
            placeholder="0000"
            type="number"
            value={timelineAndFunding.noOfDays}
            onChange={(event) => {
              dispatch(
                changeNoOfDays({
                  noOfDays: Number(event.target.value)
                })
              )
            }}
          />
          <TextField
            required
            id="full-width-text-field"
            label="Total Approved Hours"
            type="number"
            placeholder="0000"
            value={timelineAndFunding.totalApprovedHours}
            onChange={(event) => {
              dispatch(
                changeTotalApprovedHours({
                  totalApprovedHours: Number(event.target.value)
                })
              )
            }}
          />
        </Box>

        <Divider sx={{ mt: 3, mb: 3 }} variant="middle" />

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '48%' }
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl sx={{ m: 1, mt: 1, width: '48%' }} required>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Project Billing
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(event) => {
                dispatch(
                  changeProjectBilling({
                    projectBilling: event.target.value
                  })
                )
              }}
            >
              <Box
                sx={{
                  m: '5px',
                  pl: '10px',
                  border: '1px solid grey',
                  backgroundColor:
                    timelineAndFunding.projectBilling === 'redmine'
                      ? '#e6f2ff'
                      : 'white'
                }}
              >
                <FormControlLabel
                  value="redmine"
                  checked={timelineAndFunding.projectBilling === 'redmine'}
                  control={<Radio />}
                  label="Redmine"
                />
              </Box>
              <Box
                sx={{
                  m: '5px',
                  pl: '10px',
                  border: '1px solid grey',
                  backgroundColor:
                    timelineAndFunding.projectBilling === 'zira'
                      ? '#e6f2ff'
                      : 'white'
                }}
              >
                <FormControlLabel
                  value="zira"
                  checked={timelineAndFunding.projectBilling === 'zira'}
                  control={<Radio />}
                  label="Zira"
                />
              </Box>
              <Box
                sx={{
                  m: '5px',
                  pl: '10px',
                  border: '1px solid grey',
                  backgroundColor:
                    timelineAndFunding.projectBilling === 'tracker'
                      ? '#e6f2ff'
                      : 'white'
                }}
              >
                <FormControlLabel
                  value="tracker"
                  checked={timelineAndFunding.projectBilling === 'tracker'}
                  control={<Radio />}
                  label="Tracker"
                />
              </Box>
            </RadioGroup>
          </FormControl>
          <FormControl sx={{ m: 1, mt: 1, width: '48%' }} required>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Billing Frequency
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(event) => {
                dispatch(
                  changeBillingFrequency({
                    billingFrequency: event.target.value
                  })
                )
              }}
            >
              <Box
                sx={{
                  m: '5px',
                  pl: '10px',
                  border: '1px solid grey',
                  backgroundColor:
                    timelineAndFunding.billingFrequency === 'monthly'
                      ? '#e6f2ff'
                      : 'white'
                }}
              >
                <FormControlLabel
                  value="monthly"
                  checked={timelineAndFunding.billingFrequency === 'monthly'}
                  control={<Radio />}
                  label="Monthly"
                />
              </Box>
              <Box
                sx={{
                  m: '5px',
                  pl: '10px',
                  border: '1px solid grey',
                  backgroundColor:
                    timelineAndFunding.billingFrequency === 'hourly'
                      ? '#e6f2ff'
                      : 'white'
                }}
              >
                <FormControlLabel
                  value="hourly"
                  checked={timelineAndFunding.billingFrequency === 'hourly'}
                  control={<Radio />}
                  label="Hourly"
                />
              </Box>
              <Box
                sx={{
                  m: '5px',
                  pl: '10px',
                  border: '1px solid grey',
                  backgroundColor:
                    timelineAndFunding.billingFrequency === 'fortnightly'
                      ? '#e6f2ff'
                      : 'white'
                }}
              >
                <FormControlLabel
                  value="fortnightly"
                  checked={
                    timelineAndFunding.billingFrequency === 'fortnightly'
                  }
                  control={<Radio />}
                  label="Fortnightly"
                />
              </Box>
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </>
  )
}

export default TimelineAndFunding
