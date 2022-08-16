import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { LineMemory } from '../../../types'

type Entity = LineMemory

type Props = {
  entity: Entity
  onSubmit: (koyomi: Entity) => void
}

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

const LineForm = ({ entity, onSubmit }: Props) => {
  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'passwordaa',
    },
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
        <TextField fullWidth {...formikProps('email')} />
        <TextField fullWidth {...formikProps('password')} />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default LineForm
