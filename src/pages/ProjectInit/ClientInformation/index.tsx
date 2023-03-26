import React, { useState, useEffect } from 'react'
import {
  changeClient,
  changeClientAddress,
  changeClientCountry,
  changeClientCompany,
  changeClientState,
  type client
} from './reducer'
import {
  Box,
  Button,
  InputLabel,
  TextField,
  Select,
  OutlinedInput,
  MenuItem,
  Typography,
  FormControl,
  FormLabel,
  Chip,
  Divider,
  Avatar,
  type SelectChangeEvent
} from '@mui/material'
import { useTheme, type Theme } from '@mui/material/styles'
import Textarea from '@mui/joy/Textarea'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
// import IconButton from '@mui/material/IconButton'
import { deepOrange } from '@mui/material/colors'
// import CloseIcon from '@mui/icons-material/Close'
// import { IconFlagTR, IconFlagIN, IconFlagUS } from 'material-ui-flags'
import axios from 'axios'
import CancelIcon from '@mui/icons-material/Cancel'

import { projectInitiaonMock } from '../mock'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../../store'
import AddClientDialog from '../../../components/AddClientDialog'
// import { multiStepContext } from '../StepContext'
// import AddClientDialog from './AddClientDialog'

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

export const ClientInformation = (_props: any): JSX.Element => {
  const clientInfo = useSelector((state: RootState) => state.clientInfo)
  const dispatch = useDispatch()
  const { phaseData } = projectInitiaonMock
  const theme = useTheme()

  // const { userData, setUserData } = useContext(multiStepContext)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [getClientListData, setGetClientListData] = useState([] as client[])
  // const [hasError, setHasError] = useState(false)

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

  const handleClientChange = (event: SelectChangeEvent<client[]>): void => {
    const selectedValues = event.target.value
    if (typeof selectedValues === 'string') {
      return
    }
    dispatch(
      changeClient({
        clients: selectedValues
      })
    )
  }

  // const handleDelete = (e, val) => {
  //   console.log('valvalval : ', e, val)
  //   const filteredArray = userData.client.filter((e) => e !== val)
  //   setUserData({
  //     ...userData,
  //     client: filteredArray
  //   })
  // }

  const handleClickOpen = (): void => {
    setOpenDialog(true)
  }

  const handleCloseDialog = (): void => {
    setOpenDialog(false)
  }

  const baseURL = 'https://test.resource-api.writso.com/v1/client'
  const tokenStr =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OWVkMTU1OTdhYjM1Zjc4MjljZTc0NDMwN2I3OTNiN2ViZWIyZjAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQWJoaXNoZWsgU2luZ2giLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4WjROM0g5NE9UaFdlXy1LdUFXS0lBQkRzX2xGckh4TjJxLXVIUWE9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVzb3VyY2UtYXZhaWFiaWxpdHkiLCJhdWQiOiJyZXNvdXJjZS1hdmFpYWJpbGl0eSIsImF1dGhfdGltZSI6MTY3OTc3MTQxNywidXNlcl9pZCI6IjdFbTN3UVdEU0lWam9xZWlzUUF0Mm9DU01SQzMiLCJzdWIiOiI3RW0zd1FXRFNJVmpvcWVpc1FBdDJvQ1NNUkMzIiwiaWF0IjoxNjc5NzcxNDE3LCJleHAiOjE2Nzk3NzUwMTcsImVtYWlsIjoiYWJoaXNoZWsuc2luZ2hAc3VjY2Vzc2l2ZS50ZWNoIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDgwODY5MzI0MjY0MzUyNTk2MTMiXSwiZW1haWwiOlsiYWJoaXNoZWsuc2luZ2hAc3VjY2Vzc2l2ZS50ZWNoIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.XKJzDReXJ5KJv-MO3FDXGqk1BbfkI8rUk7mZpl2kIV-iKg8VQbiX95Uwy7JwG4JGk3rWtH15Ncji0BMgWf2ffoyx3n7CzByPGD4fYiV2gkVc44riWJ1RmwkNSRycUbL2wboo4edfKBDjSGYDoCIXv_U7ZqW_ZU7StfORjPnOyXQ7TpTsRvV86cq9_nD8iRbFOmMEPRxJ7lGRy4w6EOmILhNcPOoi_eV6pnKoZ2X7jBbiQMChmj2cb2nbaNw-_h1RLLJ68bPQhB4UsEgst1RI_nUyFfDNn85AA1-gbce-K2ewOqa7UQ_fvZsGnxn1-iBVTePF_gdX0ORHhWtjakhr1Q.eyJuYW1lIjoiQWJoaXNoZWsgU2luZ2giLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4WjROM0g5NE9UaFdlXy1LdUFXS0lBQkRzX2xGckh4TjJxLXVIUWE9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVzb3VyY2UtYXZhaWFiaWxpdHkiLCJhdWQiOiJyZXNvdXJjZS1hdmFpYWJpbGl0eSIsImF1dGhfdGltZSI6MTY3OTc3MTQxNywidXNlcl9pZCI6IjdFbTN3UVdEU0lWam9xZWlzUUF0Mm9DU01SQzMiLCJzdWIiOiI3RW0zd1FXRFNJVmpvcWVpc1FBdDJvQ1NNUkMzIiwiaWF0IjoxNjc5NzcxNDE3LCJleHAiOjE2Nzk3NzUwMTcsImVtYWlsIjoiYWJoaXNoZWsuc2luZ2hAc3VjY2Vzc2l2ZS50ZWNoIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDgwODY5MzI0MjY0MzUyNTk2MTMiXSwiZW1haWwiOlsiYWJoaXNoZWsuc2luZ2hAc3VjY2Vzc2l2ZS50ZWNoIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.XKJzDReXJ5KJv-MO3FDXGqk1BbfkI8rUk7mZpl2kIV-iKg8VQbiX95Uwy7JwG4JGk3rWtH15Ncji0BMgWf2ffoyx3n7CzByPGD4fYiV2gkVc44riWJ1RmwkNSRycUbL2wboo4edfKBDjSGYDoCIXv_U7ZqW_ZU7StfORjPnOyXQ7TpTsRvV86cq9_nD8iRbFOmMEPRxJ7lGRy4w6EOmILhNcPOoi_eV6pnKoZ2X7jBbiQMChmj2cb2nbaNw-_h1RLLJ68bPQhB4UsEgst1RI_nUyFfDNn85AA1-gbce-K2ewOqa7UQ_fvZsGnxn1-iBVTePF_gdX0ORHhWtjakhr1Q.eyJuYW1lIjoiU2F0aXNoIEt1bWFyIFBhdGVsIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eGJSMkJEZEV6RGtwVTZNbzhralFGUGNnd1VxZUFSTkJYSVd0VW5sPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3Jlc291cmNlLWF2YWlhYmlsaXR5IiwiYXVkIjoicmVzb3VyY2UtYXZhaWFiaWxpdHkiLCJhdXRoX3RpbWUiOjE2Nzk2MzM5ODUsInVzZXJfaWQiOiJod1RabzlCdE5PYUFZc2hZM1BORGFWMFZpd28yIiwic3ViIjoiaHdUWm85QnROT2FBWXNoWTNQTkRhVjBWaXdvMiIsImlhdCI6MTY3OTYzMzk4NSwiZXhwIjoxNjc5NjM3NTg1LCJlbWFpbCI6InNhdGlzaC5wYXRlbEBzdWNjZXNzaXZlLnRlY2giLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNDA2NDQ1NjA3NjcyNTgyNTk5NCJdLCJlbWFpbCI6WyJzYXRpc2gucGF0ZWxAc3VjY2Vzc2l2ZS50ZWNoIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.eIowTcmxwo9zqZX5N9H0eMijmsdtvyhCWczLCWH3_zgkBu-mATAU5AFs5p5WSt5oXE8QKiZlMybiJd81DY9qNDU7DJEGIBkW9JqmixUnIsWEPboS1bUcmjdaKESF2xS5CwE6iz7XvnMac-lxw3J4fY3VxlQSRU8CZY5OpsTCbhiEqAiQmnELKWW9KrH0V9Or75PXNJBnG4b5AIMbSTaC9iL0l0CWFVzpE_6MpPAdyAMCYaW-NADaK_6YKtPBHubF01YG781PSDxb9bRXS9ze0Pz3Sa5o59tSWfyP4Tnr2KmgLl-9tdQKZdhyy6lJhKV6-MlKjTAdVpzM_u6z9mKzuA'

  useEffect(() => {
    axios
      .get(baseURL, { headers: { Authorization: tokenStr } })
      .then((response) => {
        setGetClientListData([
          { id: 1, name: 'Olivia', emails: 'singh4758@gail.com' },
          { id: 2, name: 'snsjsjs', emails: 'aaaaaa' },
          { id: 3, name: 'Ol', emails: 'sdsggs' }
        ])
        // setUserData({ ['client']: response?.data?.data})
      })
      .catch(() => {
        setGetClientListData([
          { id: 1, name: 'Olivia', emails: 'singh4758@gail.com' },
          { id: 2, name: 'snsjsjs', emails: 'aaaaaa' },
          { id: 3, name: 'Ol', emails: 'sdsggs' }
        ])
      })
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
          <FormControl sx={{ m: 1, width: '48%' }} required>
            <InputLabel id="demo-multiple-name-label">Client</InputLabel>
            <Select
              required
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={clientInfo.client}
              onChange={handleClientChange}
              input={<OutlinedInput label="Client" />}
              MenuProps={MenuProps}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {Boolean(selected?.length) &&
                    selected.map((item) => (
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
                        key={item.name}
                        variant="outlined"
                        clickable
                        onDelete={(e) => {}}
                        deleteIcon={
                          <CancelIcon
                            onMouseDown={(event) => {
                              event.stopPropagation()
                            }}
                          />
                        }
                        onClick={(e) => {}}
                        sx={{ border: 'none' }}
                        label={
                          <div>
                            <Typography sx={{ mb: -1 }}>{item.name}</Typography>
                            <Typography variant="caption">
                              {item.emails}
                            </Typography>
                          </div>
                        }
                      />
                    ))}
                </Box>
              )}
            >
              {Boolean(getClientListData?.length) &&
                getClientListData.map((itm) => (
                  // @ts-expect-error [1]
                  <MenuItem key={itm.id} value={itm}>
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
                      <Typography variant="caption">{itm.emails}</Typography>
                    </div>
                  </MenuItem>
                ))}
            </Select>
            {/* {hasError && (
              <FormHelperText>This field is required</FormHelperText>
            )} */}
          </FormControl>
          <TextField
            required
            id="full-width-text-field"
            label="Company"
            placeholder="Company Name"
            value={clientInfo.company}
            onChange={(event) => {
              dispatch(changeClientCompany({ company: event.target.value }))
            }}
            margin="normal"
            fullWidth
            helperText="ddd"
          />
          <Button
            sx={{ m: 1, mt: 3, mb: 3 }}
            variant="outlined"
            startIcon={<PersonAddAltIcon />}
            onClick={handleClickOpen}
          >
            Add New Client
          </Button>
        </Box>

        <Divider sx={{ mb: 4 }} variant="middle" />

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '48%' }
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl sx={{ m: 1, width: '48%' }} required>
            <InputLabel id="demo-multiple-name-label">Country </InputLabel>
            <Select
              required
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              // multiple
              value={clientInfo.country}
              onChange={(event) => {
                dispatch(
                  changeClientCountry({
                    country: event.target.value
                  })
                )
              }}
              input={<OutlinedInput label="Country" />}
              MenuProps={MenuProps}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  <Chip
                    avatar={
                      <Avatar
                        sx={{ width: 24, height: 24, bgcolor: deepOrange[400] }}
                      >
                        {/* <IconFlagIN /> */}
                      </Avatar>
                    }
                    key={selected}
                    variant="outlined"
                    sx={{ border: 'none' }}
                    label={
                      <div>
                        <Typography>{selected}</Typography>
                      </div>
                    }
                  />
                </Box>
              )}
            >
              {phaseData.map((itm) => (
                <MenuItem
                  key={itm.name}
                  value={itm.name}
                  // style={getStyles(itm.name, userData, theme)}
                >
                  <Avatar
                    sx={{
                      mr: 1,
                      width: 24,
                      height: 24,
                      bgcolor: deepOrange[400]
                    }}
                  >
                    {/* <IconFlagIN /> */}
                  </Avatar>
                  <Typography>{itm.name}</Typography>
                  {/* <IconFlagIN  /> */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: '48%' }} required>
            <InputLabel id="demo-multiple-name-label">State</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              // multiple
              required
              value={clientInfo.state}
              onChange={(event) => {
                dispatch(changeClientState({ state: event.target.value }))
              }}
              input={<OutlinedInput label="State" />}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, clientInfo, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, width: '48%' }} required>
            <FormLabel>Address</FormLabel>
            <Textarea
              placeholder="Address"
              minRows={2}
              value={clientInfo.address}
              onChange={({ target: { value } }) => {
                dispatch(changeClientAddress({ address: value }))
              }}
            />
          </FormControl>
        </Box>
        {openDialog && (
          <AddClientDialog
            openDialog={openDialog}
            handleClose={handleCloseDialog}
          />
        )}
      </Box>
    </>
  )
}
