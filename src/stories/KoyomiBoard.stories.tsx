import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import KoyomiBoard from '../components/KoyomiPage/KoyomiBoard'
import { koyomiAchive, koyomiWepon } from './seed'

type Props = ComponentProps<typeof KoyomiBoard>
export default {
  title: 'KoyomiBoard',
  component: KoyomiBoard,
  args: {},
  parameters: {},
  // decorators: decorators(),
} as Meta<Props>

export const Base: Story<Props> = (_args) => (
  <KoyomiBoard koyomis={[koyomiWepon, koyomiAchive]} />
)
