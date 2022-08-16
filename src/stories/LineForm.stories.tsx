import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { action } from '@storybook/addon-actions'
import LineForm from '../components/KoyomiPage/KoyomiEditor/LineForm'
import { LineMemory } from '../types'

type Props = ComponentProps<typeof LineForm>
export default {
  title: 'LineForm',
  component: LineForm,
  args: {},
  parameters: {},
  // decorators: decorators(),
  argTypes: {
    // onSubmit: { action: 'submitted' },
  },
} as Meta<Props>

const line: LineMemory = {
  itemId: null,
  label: null,
  time: '2022-07-00',
  category: 'range',
  end: '2022-08-00',
  id: '',
  startMi: 202207,
  endMi: 202208,
  range: 1,
}

export const Base: Story<Props> = (_args) => (
  <LineForm entity={line} onSubmit={action('submit')} />
)
