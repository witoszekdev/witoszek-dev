/* @jsx jsx */

import React from "react";
import { jsx } from "@theme-ui/core";
import {Text} from "@theme-ui/components"
import { Link, graphql, useStaticQuery } from "gatsby";
import Title from "@lekoarts/gatsby-theme-minimal-blog/src/components/title";
import ProjectCard from "./ProjectCard";

const ProjectsList = () => {
  const data = useStaticQuery(graphql`query projectsHome {
  allMdx(filter: {fileAbsolutePath: {regex: "//projects//"}}, limit: 3) {
    nodes {
      frontmatter {
        title
        technologies
        slug
        created(locale: "pl")
        shortDesc
        frontImg {
          childImageSharp {
            gatsbyImageData(
              width: 400
              height: 200
              quality: 95
              transformOptions: {cropFocus: NORTH}
              layout: CONSTRAINED
            )
          }
        }
      }
    }
  }
}
`);
  const projects = data.allMdx.nodes;
  return projects.map(({ frontmatter: project }) => (
    <ProjectCard
      key={project.title}
      imgData={project.frontImg.childImageSharp.gatsbyImageData}
      name={project.title}
      description={project.shortDesc}
      link={`/projects${project.slug}`}
      technologies={project.technologies}
      badgeProps={{
        light: true
      }}
    />
  ));
};

const ProjectsHome = () => {
  return (
    <>
      <Title text="Projects">
        <Link to="/projects">
          <Text sx={{fontSize: '1', color: 'textMuted'}}>View all projects</Text>
        </Link>
      </Title>
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: ["1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr 1fr"],
          gridColumnGap: "3",
          gridRowGap: "4",
          justifyItems: "center",
          width: "100%",
        }}
      >
        <ProjectsList />
      </div>
    </>
  );
};

export default ProjectsHome;
