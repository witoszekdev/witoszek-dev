/* @jsx jsx */
import React from "react";
import { jsx } from "@theme-ui/core";

export default function ProjectDataLabel({
  children,
  icon: Icon = () => null,
  label,
}) {
  return (
    <div sx={{"&:first-of-type > div": {marginTop: 0}}}>
      <div
        sx={{
          fontSize: "0.875rem",
          fontWeight: "light",
          color: "textMuted",
          fontFamily: "mono",
          marginTop: "2",
        }}
      >
        {label}
      </div>
      <span sx={{ display: "flex", alignItems: "center", fontFamily: "mono" }}>
        <Icon size={20} sx={{ marginRight: "8px" }} />
        <span>{children}</span>
      </span>
    </div>
  );
}
