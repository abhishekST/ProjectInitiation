import React, { useState, useEffect } from 'react'
import {
  changeClient,
  changeCompanyAddress,
  changeCompanyCountry,
  changeCompany,
  changeCompanyState,
  validateField
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
import { deepOrange } from '@mui/material/colors'
import axios from 'axios'
import CancelIcon from '@mui/icons-material/Cancel'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../../store'
import AddClientDialog from '../../../components/AddClientDialog'
import { configuration } from '../../../configs/configuration'
import { countryData } from '../../../constant/countryData'
// import { countryData } from '../../../constant/countryData'

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
  return {
    fontWeight: theme.typography.fontWeightMedium
  }
}

const ClientInformation = (_props: any): JSX.Element => {
  const companyInfo = useSelector((state: RootState) => state.companyInfo)
  const [projectsName, setProjectsName] = useState([])
  const dispatch = useDispatch()
  const theme = useTheme()

  const [openDialog, setOpenDialog] = React.useState(false)
  const [getClientListData, setGetClientListData] = useState(
    [] as Array<{ id: number, name: string, emails: string }>
  )

  const handleClientChange = (event: SelectChangeEvent<number[]>): void => {
    const selectedValues = event.target.value
    if (typeof selectedValues === 'string') {
      return
    }
    dispatch(
      changeClient({
        client_detail: selectedValues
      })
    )

    let str = ''

    selectedValues.forEach((id, index) => {
      str += `${index !== 0 ? '&' : ''}id[]=${id}`
    })

    axios
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .get(`${configuration.uri}/v1/get-company-from-client?${str}`, {
        headers: {
          authorization:
            'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OWVkMTU1OTdhYjM1Zjc4MjljZTc0NDMwN2I3OTNiN2ViZWIyZjAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQWJoaXNoZWsgU2luZ2giLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4WjROM0g5NE9UaFdlXy1LdUFXS0lBQkRzX2xGckh4TjJxLXVIUWE9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVzb3VyY2UtYXZhaWFiaWxpdHkiLCJhdWQiOiJyZXNvdXJjZS1hdmFpYWJpbGl0eSIsImF1dGhfdGltZSI6MTY3OTk3NTQxNCwidXNlcl9pZCI6IjdFbTN3UVdEU0lWam9xZWlzUUF0Mm9DU01SQzMiLCJzdWIiOiI3RW0zd1FXRFNJVmpvcWVpc1FBdDJvQ1NNUkMzIiwiaWF0IjoxNjc5OTc1NDE0LCJleHAiOjE2Nzk5NzkwMTQsImVtYWlsIjoiYWJoaXNoZWsuc2luZ2hAc3VjY2Vzc2l2ZS50ZWNoIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDgwODY5MzI0MjY0MzUyNTk2MTMiXSwiZW1haWwiOlsiYWJoaXNoZWsuc2luZ2hAc3VjY2Vzc2l2ZS50ZWNoIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.I1insGWvhzkrGdKaZlMvQ9w07nGXPvf0hhafi0N48dNLMT7dLb8UN6h1NO7ewWRiCmEsj5O9jx4r0ne2ThvNgHIIp5cd__DF_SobVqigD6yrZT6hQFIE4n5domCOFBoQChIG9vJujRlSj_r4psKik7WQhHFa72HpIWHfkjZ9NYnQjvEXscGOkmTZdvbkJeVXU-PlQ0glIlaxq3myEJct7z01WgLRp7fg5bY__uRTBrw01f3gOs0lV2o-FlVrldumkh3xI0WoIY-tRcH0JOq91Wzot-Vj0WLkqSxzrSDS6lnj_O5bf2HMABV-8V1IdXu3g4qwNq2QKMBURxUw9jMVNg'
        }
      })
      .then((response) => {
        const companyInformation = response?.data?.data ?? []
        console.log(companyInformation)
        const companyLocation = companyInformation.company_name[0]
        dispatch(changeCompanyCountry({ country: companyLocation.country }))
        dispatch(changeCompanyState({ state: companyLocation.state }))
        dispatch(
          changeCompanyAddress({ address: companyLocation.company_address })
        )
        dispatch(changeCompany({ company: companyLocation.company_name }))
        setProjectsName((companyInformation?.project_name !== undefined) ? companyInformation.project_name : [])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleClickOpen = (): void => {
    setOpenDialog(true)
  }

  const handleCloseDialog = (): void => {
    setOpenDialog(false)
  }

  useEffect(() => {
    const timeoutIdForClient = setTimeout(() => {
      axios
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        .get(`${configuration.uri}/v1/client`, {
          headers: {
            authorization:
              'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OWVkMTU1OTdhYjM1Zjc4MjljZTc0NDMwN2I3OTNiN2ViZWIyZjAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQWJoaXNoZWsgU2luZ2giLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4WjROM0g5NE9UaFdlXy1LdUFXS0lBQkRzX2xGckh4TjJxLXVIUWE9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVzb3VyY2UtYXZhaWFiaWxpdHkiLCJhdWQiOiJyZXNvdXJjZS1hdmFpYWJpbGl0eSIsImF1dGhfdGltZSI6MTY3OTk3NTQxNCwidXNlcl9pZCI6IjdFbTN3UVdEU0lWam9xZWlzUUF0Mm9DU01SQzMiLCJzdWIiOiI3RW0zd1FXRFNJVmpvcWVpc1FBdDJvQ1NNUkMzIiwiaWF0IjoxNjc5OTc1NDE0LCJleHAiOjE2Nzk5NzkwMTQsImVtYWlsIjoiYWJoaXNoZWsuc2luZ2hAc3VjY2Vzc2l2ZS50ZWNoIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDgwODY5MzI0MjY0MzUyNTk2MTMiXSwiZW1haWwiOlsiYWJoaXNoZWsuc2luZ2hAc3VjY2Vzc2l2ZS50ZWNoIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.I1insGWvhzkrGdKaZlMvQ9w07nGXPvf0hhafi0N48dNLMT7dLb8UN6h1NO7ewWRiCmEsj5O9jx4r0ne2ThvNgHIIp5cd__DF_SobVqigD6yrZT6hQFIE4n5domCOFBoQChIG9vJujRlSj_r4psKik7WQhHFa72HpIWHfkjZ9NYnQjvEXscGOkmTZdvbkJeVXU-PlQ0glIlaxq3myEJct7z01WgLRp7fg5bY__uRTBrw01f3gOs0lV2o-FlVrldumkh3xI0WoIY-tRcH0JOq91Wzot-Vj0WLkqSxzrSDS6lnj_O5bf2HMABV-8V1IdXu3g4qwNq2QKMBURxUw9jMVNg'
          }
        })
        .then((response) => {
          setGetClientListData(response?.data?.data ?? [])
        })
        .catch((error) => {
          console.log(error)
        })
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
          <FormControl sx={{ m: 1, width: '48%' }} required>
            <InputLabel id="demo-multiple-name-label">Client</InputLabel>
            <Select
              required
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={companyInfo.client_detail}
              onChange={handleClientChange}
              onBlur={() => dispatch(validateField({ field: 'client' }))}
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
                        key={item}
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
                            <Typography sx={{ mb: -1 }}>
                              {
                                getClientListData?.find(({ id }) => item === id)
                                  ?.name
                              }
                            </Typography>
                            <Typography variant="caption">
                              {
                                getClientListData?.find(({ id }) => item === id)
                                  ?.emails
                              }
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
                  <MenuItem key={itm.id} value={itm.id}>
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
              value={companyInfo.company}
              onChange={(event) => {
                dispatch(changeCompany({ company: event.target.value }))
              }}
              onBlur={() => dispatch(validateField({ field: 'company' }))}
              margin="normal"
              fullWidth
              helperText={projectsName.map(({ name }) => name)}
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
              value={companyInfo.country}
              onChange={(event) => {
                dispatch(
                  changeCompanyCountry({
                    country: event.target.value
                  })
                )
              }}
              onBlur={() => dispatch(validateField({ field: 'country' }))}
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
              {countryData.map(({ countryName }) => (
                <MenuItem
                  key={countryName}
                  value={countryName}
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
                  <Typography>{countryName}</Typography>
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
              value={companyInfo.state}
              onChange={(event) => {
                dispatch(changeCompanyState({ state: event.target.value }))
              }}
              onBlur={() => dispatch(validateField({ field: 'state' }))}
              input={<OutlinedInput label="State" />}
              MenuProps={MenuProps}
            >
              {countryData
                .find(({ countryName }) => countryName === companyInfo.country)
                ?.regions.map(({ name }) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, companyInfo, theme)}
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
              value={companyInfo.address}
              onChange={({ target: { value } }) => {
                dispatch(changeCompanyAddress({ address: value }))
              }}
              onBlur={() => dispatch(validateField({ field: 'address' }))}
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

export default ClientInformation
