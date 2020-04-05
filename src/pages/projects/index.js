/* @jsx jsx */
import React, { useState, useCallback } from "react";
import { graphql } from "gatsby";
import { jsx } from "@theme-ui/core";
import { Box, IconButton } from "@theme-ui/components";
import { FiXCircle } from "react-icons/fi";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import ProjectCard from "../../components/ProjectCard";
import TechnologyBadge from "../../components/TechnologyBadge";

export default function ProjectsPage({ data }) {
  const projects = data.allMdx.nodes;
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [filterTechnology, setFilterTechnology] = useState(undefined);
  const technologies = [
    ...new Set(
      data.allMdx.nodes.flatMap((project) => project.frontmatter.technologies)
    ),
  ];

  const handleFilter = useCallback((val) => {
    if (val === null) {
      setFilterTechnology(null);
      setFilteredProjects(projects);
    } else {
      setFilterTechnology(val);
      const newProjects = projects.filter((project) =>
        project.frontmatter.technologies.includes(val)
      );
      setFilteredProjects(newProjects);
    }
  }, []);

  return (
    <Layout>
      <h2
        sx={{
          color: `heading`,
          fontSize: [4, 5, 6],
        }}
      >
        My Projects
      </h2>
      <span sx={{ fontFamily: "mono" }}>Filter projects</span>
      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: "3",
          "& > div": { marginRight: "2" },
        }}
      >
        {technologies.map((name) => (
          <TechnologyBadge
            sx={{ cursor: "pointer" }}
            key={name}
            name={name}
            selected={filterTechnology === name}
            onClick={() => handleFilter(name)}
          />
        ))}
        {filterTechnology && (
          <IconButton size={8} onClick={() => handleFilter(null)}>
            <FiXCircle size={24} />
          </IconButton>
        )}
      </div>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: ["1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr 1fr"],
          gridColumnGap: "3",
          gridRowGap: "4",
          justifyItems: "center",
          width: "100%",
        }}
      >
        {filteredProjects.map(({ frontmatter: project }) => (
          <ProjectCard
            key={project.title}
            imgData={project.frontImg.childImageSharp.fluid}
            name={project.title}
            description={project.shortDesc}
            link={`/projects${project.slug}`}
            technologies={project.technologies}
          />
        ))}
      </Box>
    </Layout>
  );
}

export const query = graphql`
  query ProjectsMDX {
    allMdx(filter: { fileAbsolutePath: { regex: "//projects//" } }) {
      nodes {
        frontmatter {
          title
          technologies
          slug
          created(locale: "pl")
          shortDesc
          frontImg {
            childImageSharp {
              fluid(
                maxWidth: 400
                maxHeight: 200
                cropFocus: NORTH
                quality: 95
              ) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
