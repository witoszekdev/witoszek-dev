/* @jsx jsx */
import React from "react";
import { jsx } from "@theme-ui/core";

export default function ProjectDataLabel({ children, icon: Icon, label }) {
  return (
    <>
      <span
        sx={{ fontSize: "0.875rem", fontWeight: "light", color: 'textMuted', fontFamily: "mono" }}
      >
        {label}
      </span>
      <span sx={{ display: "flex", alignItems: "center", fontFamily: "mono" }}>
        <Icon size={20} sx={{ marginRight: "8px" }} />
        <span>{children}</span>
      </span>
    </>
  );
}
