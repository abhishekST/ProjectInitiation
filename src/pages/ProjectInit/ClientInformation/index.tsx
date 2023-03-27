import React, { useState, useEffect } from 'react'
import {
  changeClient,
  changeClientAddress,
  changeClientCountry,
  changeClientCompany,
  changeClientState,
  type client,
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
import { projectInitiaonMock } from '../mock'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../../store'
import AddClientDialog from '../../../components/AddClientDialog'
import { configuration } from '../../../configs/configuration'
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
  const clientInfo = useSelector((state: RootState) => state.clientInfo)
  const dispatch = useDispatch()
  const { phaseData } = projectInitiaonMock
  const theme = useTheme()

  const [openDialog, setOpenDialog] = React.useState(false)
  const [getClientListData, setGetClientListData] = useState([] as client[])

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
        .get(`${configuration.uri}/v1/client`, { headers: { authorization: configuration.token } })
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
              value={clientInfo.client}
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
            onBlur={() => dispatch(validateField({ field: 'company' }))}
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
              onBlur={() => dispatch(validateField({ field: 'state' }))}
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
