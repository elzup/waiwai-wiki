import { pad02, range, rangeAdv } from '@elzup/kit'
import { Slider, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'
import MonthPicker from '@mui/x-date-pickers/MonthPicker'
import { MemoryPoint } from '../../../types'
import { miToYm, ymKeyToMi } from '../../../utils/koyomi'

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

const valueLabelFormat = (v: number) => {
  const { y, m } = miToYm(v)

  return `${y}-${pad02(m)}`
}

const MemoryForm = ({ entity, onSubmit }: Props) => {
  const [mi, setMi] = useState<number>(ymKeyToMi(entity.time))

  const [miPast, setMiPast] = useState<number>(mi - 12)
  const [miFutu, setMiFutu] = useState<number>(mi + 12)

  console.log('hello')

  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: entity,
    validationSchema: validationSchema,
    onSubmit: (v) => {
      onSubmit(v)
      // alert(JSON.stringify(values, null, 2))
    },
  })

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth {...formikProps('label')} />
        <Slider
          {...formikProps}
          track={false}
          value={mi}
          min={miPast}
          max={miFutu}
          getAriaValueText={valueLabelFormat}
          valueLabelDisplay="on"
          marks={marks}
          onChange={(e, v) => {
            if (typeof v === 'number') {
              setMi(v)
            }
          }}
          valueLabelFormat={valueLabelFormat}
        />
        <Typography>月: {valueLabelFormat(mi)}</Typography>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default MemoryForm
