import type { ISwitcherProps } from '@/entities/auth/ui/switcher/model'
import { FormControlLabel, Switch } from '@mui/material'
import type { FC } from 'react'

export const Switcher: FC<ISwitcherProps> = ({ ...rest }) => {
	const { handleSwitch, label } = rest

	return <FormControlLabel control={<Switch onClick={handleSwitch} />} label={label} />
}
