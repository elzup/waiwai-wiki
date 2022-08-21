import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { action } from '@storybook/addon-actions'
import MemoryForm from '../components/KoyomiPage/KoyomiEditor/MemoryForm'
import { Memory, MemoryPoint } from '../types'

type Props = ComponentProps<typeof MemoryForm>
export default {
  title: 'MemoryForm',
  component: MemoryForm,
  args: {},
  parameters: {},
  // decorators: decorators(),
  argTypes: {
    // onSubmit: { action: 'submitted' },
  },
} as Meta<Props>

const line: MemoryPoint = {
  itemId: null,
  label: null,
  time: '2022-07',
  category: 'point',
}

export const Base: Story<Props> = (_args) => (
  <MemoryForm entity={line} onSubmit={action('submit')} />
)
