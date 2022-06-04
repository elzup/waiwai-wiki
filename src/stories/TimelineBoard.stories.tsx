import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'

import TimelineBoard from '../components/TimelinePage/TimelineBoard'
import { timeline } from './seed'

type Props = ComponentProps<typeof TimelineBoard>
export default {
  title: 'TimelineBoard',
  component: TimelineBoard,
  args: {},
  parameters: {},
  // decorators: decorators(),
} as Meta<Props>

export const Base: Story<Props> = (_args) => (
  <TimelineBoard timeline={timeline} />
)
