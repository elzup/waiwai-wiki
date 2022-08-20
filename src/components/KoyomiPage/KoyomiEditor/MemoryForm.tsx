import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { MemoryPoint } from '../../../types'

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
  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: entity,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(entity)
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth {...formikProps('label')} />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default MemoryForm
