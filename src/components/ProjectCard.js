/* @jsx jsx */

import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import { jsx } from "@theme-ui/core";
import { Text, Button, Box } from "@theme-ui/components";
import {FiArrowRight} from "react-icons/fi"
import TechnologyBadge from "./TechnologyBadge";

export default function ProjectCard({
  imgData,
  name,
  description = "",
  link,
  technologies,
}) {
  return (
    <Box
      p={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        boxShadow: "md",
        borderRadius: "default",
        width: "100%",
        height: "100%",
        maxWidth: "400px",
      }}
    >
      <Img fluid={imgData} />
      <Text sx={{ fontSize: 2, fontWeight: "medium" }}>{name}</Text>
      <Text sx={{marginBottom: '2'}}>{description}</Text>
      <div sx={{display: 'flex', justifyItems: 'center', marginBottom: '2', flexWrap: 'wrap', "& > div": {marginRight: '2', marginBottom: '2'}}}>
        {technologies.map((name) => (
          <TechnologyBadge key={name} name={name} />
        ))}
      </div>
      <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: 'auto'}}>
        <Link to={link} sx={{textDecoration: 'none'}}>
          <Button href={"12345"} sx={{display: 'flex', alignItems: 'center'}}>
            View details
            <FiArrowRight sx={{marginLeft: '2'}} />
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
