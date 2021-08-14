/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { Box } from '@theme-ui/components';
import useTechnologyData from '../hooks/useTechnologyData';
import { shade, invert, darken, tint } from '@theme-ui/color';

const TechnologyBadge = ({ name, selected, light, ...props }) => {
  const {
    name: fullName,
    color,
    textColor,
    icon,
    iconSize,
  } = useTechnologyData(name);
  const defaultIcon = () => null;
  const doLightColors = selected || light;
  const Icon = icon ?? defaultIcon;
  if (fullName) {
    return (
      <Box
        sx={{
          borderRadius: 'default',
          backgroundColor: doLightColors ? tint(color, 0.4) : color,
          borderWidth: selected ? '2' : '0',
          borderStyle: 'solid',
          borderColor: textColor ? shade(textColor, 0.8) : shade(color, 0.8),
          color: doLightColors
            ? textColor
              ? darken(textColor, 0.8)
              : shade(color, 0.8)
            : textColor ?? shade(color, 0.7),
          display: 'inline-flex',
          alignItems: 'center',
          '&::selection': {
            background: invert(color),
          },
        }}
        borderWidth="2"
        paddingY="1"
        paddingX="2"
        {...props}
      >
        <Icon
          sx={{
            marginRight: iconSize
              ? `calc(0.5rem - (16 / ${iconSize}) * 0.3rem)`
              : '2',
          }}
          size={iconSize ?? '1rem'}
        />
        {fullName}
      </Box>
    );
  } else {
    return null;
  }
};

export default TechnologyBadge;
