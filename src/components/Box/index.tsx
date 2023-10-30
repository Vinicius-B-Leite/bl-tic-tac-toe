import { ThemeType } from '@/theme/theme';
import { createBox } from '@shopify/restyle';




const Box = createBox<ThemeType>()
export type BoxType = React.ComponentProps<typeof Box>
export default Box