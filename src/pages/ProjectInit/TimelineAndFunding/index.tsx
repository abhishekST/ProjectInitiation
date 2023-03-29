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
  changeProjectBilling,
  changeStartDate
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
              value={timelineAndFunding.estimated_timeline_from}
              onChange={(value) => {
                dispatch(
                  changeStartDate({
                    estimated_timeline_from: value
                  })
                )
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date *"
              value={timelineAndFunding.estimated_timeline_to}
              onChange={(value) => {
                dispatch(
                  changeEndDate({
                    estimated_timeline_to: value
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
            disabled
            value={`${timelineAndFunding.approved_hours !== null ? Number(timelineAndFunding.approved_hours) / 24 : 0} Days}`}
          />
          <TextField
            required
            id="full-width-text-field"
            label="Total Approved Hours"
            placeholder="0000"
            disabled
            value={timelineAndFunding.approved_hours}
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
                    billing_medium: Number(event.target.value) ?? null
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
                    timelineAndFunding.billing_medium === 0
                      ? '#e6f2ff'
                      : 'white'
                }}
              >
                <FormControlLabel
                  value="redmine"
                  checked={timelineAndFunding.billing_medium === 0}
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
                    timelineAndFunding.billing_medium === 1
                      ? '#e6f2ff'
                      : 'white'
                }}
              >
                <FormControlLabel
                  value="zira"
                  checked={timelineAndFunding.billing_medium === 1}
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
                    timelineAndFunding.billing_medium === 2
                      ? '#e6f2ff'
                      : 'white'
                }}
              >
                <FormControlLabel
                  value="tracker"
                  checked={timelineAndFunding.billing_medium === 2}
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
                    billing_interval: Number(event.target.value) ?? null
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
                    timelineAndFunding.billing_interval === 0
                      ? '#e6f2ff'
                      : 'white'
                }}
              >
                <FormControlLabel
                  value="monthly"
                  checked={timelineAndFunding.billing_interval === 0}
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
                    timelineAndFunding.billing_interval === 1
                      ? '#e6f2ff'
                      : 'white'
                }}
              >
                <FormControlLabel
                  value="hourly"
                  checked={timelineAndFunding.billing_interval === 1}
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
                    timelineAndFunding.billing_interval === 2
                      ? '#e6f2ff'
                      : 'white'
                }}
              >
                <FormControlLabel
                  value="fortnightly"
                  checked={
                    timelineAndFunding.billing_interval === 2
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
