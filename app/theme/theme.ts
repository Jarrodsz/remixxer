import colors from './foundations/colors';
import semanticTokens from './foundations/semantic-tokens';
import shadows from './foundations/shadows';
import sizes from './foundations/sizes';
import {fonts, fontSizes, textStyles} from './foundations/typography';
import components from './components';

import {extendTheme, withDefaultColorScheme} from '@chakra-ui/react';

import {theme as baseTheme} from '@saas-ui/react';

export const theme = extendTheme(
	{
		colors,
		fonts,
		fontSizes,
		textStyles,
		sizes,
		components,
		shadows,
		semanticTokens
	},
	withDefaultColorScheme({
		colorScheme: 'primary',
		components: ['Radio', 'Switch', 'Checkbox']
	}),
	baseTheme
);
