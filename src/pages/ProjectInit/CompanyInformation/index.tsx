import React, { useState, useEffect, type ChangeEvent } from 'react'
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
import CancelIcon from '@mui/icons-material/Cancel'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../../store'
import AddClientDialog from '../../../components/AddClientDialog'
import { configuration } from '../../../configs/configuration'
import { countryData } from '../../../constant/countryData'
import { fetch } from '../../../utils/helper'
import { type Project, type GetClientFromCompany } from '../../../interface/componentInformation'

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
  const [projectsName, setProjectsName] = useState([] as Project[])
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

    Promise.all([fetch(configuration.resourceUrl, `get-company-from-client?${str}`)])
      .then(([response]) => {
        const companyInformation = response?.data?.data ?? []
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

  const handleCompanyChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const companyName = event.target.value
    dispatch(
      changeCompany({
        company: companyName
      })
    )

    Promise.all([fetch(configuration.resourceUrl, `get-client-from-company?company_name=${companyName}`)])
      .then(([response]) => {
        const companyInformation = response.data.data as GetClientFromCompany
        dispatch(changeCompanyCountry({ country: companyInformation.country }))
        dispatch(changeCompanyState({ state: companyInformation.state }))
        dispatch(
          changeCompanyAddress({ address: companyInformation.company_address })
        )
        dispatch(changeClient({ client_detail: companyInformation?.client_name.map(({ id }) => id) }))
        setProjectsName((companyInformation.project_name !== undefined) ? companyInformation.project_name : [])
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
      Promise.all([fetch(configuration.resourceUrl, 'client')])
        .then(([response]) => {
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
              onChange={handleCompanyChange}
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
