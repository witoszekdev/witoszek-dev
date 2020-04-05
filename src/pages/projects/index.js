import React from "react";
import { graphql } from "gatsby";
import {Box} from "@theme-ui/components";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import ProjectCard from "../../components/ProjectCard";

export default function ProjectsPage({ data }) {
  const projects = data.allMdx.nodes;
  return (
    <Layout>
      <Box sx={{display: 'grid', gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr 1fr'], gridColumnGap: '10px', justifyItems: 'center', width: '100%', }}>
      {projects.map(({frontmatter: project}) => (
        <ProjectCard imgData={project.frontImg.childImageSharp.fluid} name={project.title} description={project.shortDesc} link={`/projects${project.slug}`} />
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
              fluid(maxWidth: 400, maxHeight: 200, cropFocus: NORTH, quality: 95) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
