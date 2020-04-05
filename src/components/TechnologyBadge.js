/* @jsx jsx */
import React from "react";
import { jsx } from "@theme-ui/core";
import { Box } from "@theme-ui/components";
import useTechnologyData from "../hooks/useTechnologyData";
import { shade, invert } from "@theme-ui/color";

const TechnologyBadge = ({ name }) => {
  const { name: fullName, color, textColor, icon, iconSize } = useTechnologyData(name);
  const defaultIcon = () => null;
  const Icon = icon ?? defaultIcon;
  if (fullName) {
    return (
      <Box
        borderWidth="2"
        sx={{
          borderRadius: 'default',
          backgroundColor: color,
          color: textColor ?? shade(color, "0.7"),
          display: "inline-flex",
          alignItems: "center",
          "&::selection": {
            background: invert(color)
          }
        }}
        paddingY="1"
        paddingX="2"
      >
        <Icon sx={{ marginRight: iconSize ? `calc(0.5rem - (16 / ${iconSize}) * 0.3rem)` : "2" }} size={iconSize ?? '1rem'} />
        {fullName}
      </Box>
    );
  } else {
    return null
  }
};

export default TechnologyBadge;
