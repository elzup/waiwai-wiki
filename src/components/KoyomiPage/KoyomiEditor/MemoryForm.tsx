import { rangeAdv } from '@elzup/kit'
import { Box, IconButton, Slider, Typography } from '@mui/material'
import ZoomIn from '@mui/icons-material/ZoomIn'
import Button from '@mui/material/Button'

import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'
import { MemoryPoint } from '../../../types'
import { miToYm, miToYmKey, ymKeyToMi } from '../../../utils/koyomi'

type Entity = MemoryPoint

type Props = {
  entity: Entity
  onSubmit: (entity: Entity) => void
}

const validationSchema = yup.object({
  category: yup.string().required(),
  itemId: yup.string().nullable(),
  label: yup.string().nullable(),
  time: yup.string().required(),
})

const MemoryForm = ({ entity, onSubmit }: Props) => {
  const [mi, setMi] = useState<number>(ymKeyToMi(entity.time))

  const [miPast, setMiPast] = useState<number>(mi - 12)
  const [miFutu, setMiFutu] = useState<number>(mi + 12)

  const ymKey = miToYmKey(mi)

  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: entity,
    validationSchema: validationSchema,
    onSubmit: (v) => {
      onSubmit(v)
      // alert(JSON.stringify(values, null, 2))
    },
  })
  const zoomReset = () => {
    setMiPast(mi - 12)
    setMiFutu(mi + 12)
  }

  const formikProps = (key: keyof typeof values) => ({
    id: key,
    value: values[key],
    name: key,
    label: key,
    error: Boolean(touched[key]) && Boolean(errors[key]),
    helperText: Boolean(touched[key]) && errors[key],
    onChange: handleChange,
  })
  const marks = rangeAdv(miPast, miFutu + 1)
    .map((v) => ({ ...miToYm(v), v }))
    .map(({ y, m, v }) => ({ value: v, label: m === 6 ? 6 : m === 1 ? y : '' }))
    .filter((v) => v.label !== '')
  const expandCheck = (mi: number) => {
    if (mi < miPast + 6) {
      setMiPast(mi - 12)
    }
    if (miFutu - 6 < mi) {
      setMiFutu(mi + 12)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth {...formikProps('label')} />
        <Box display="flex" alignItems="center">
          <Slider
            {...formikProps}
            track={false}
            value={mi}
            min={miPast}
            max={miFutu}
            getAriaValueText={miToYmKey}
            valueLabelDisplay="auto"
            marks={marks}
            onChangeCommitted={(e, v) => {
              if (typeof v !== 'number') return
              expandCheck(v)
            }}
            onChange={(e, v) => {
              if (typeof v !== 'number') return

              setMi(v)
            }}
            valueLabelFormat={miToYmKey}
          />
          <IconButton onClick={zoomReset}>
            <ZoomIn />
          </IconButton>
        </Box>
        <Typography>月: {miToYmKey(mi)}</Typography>
        <TextField
          fullWidth
          type="number"
          value={ymKey}
          InputProps={{
            type: 'month',
          }}
          onChange={(e) => {
            const mi = ymKeyToMi(e.target.value)

            expandCheck(mi)
            setMi(mi)
          }}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default MemoryForm
