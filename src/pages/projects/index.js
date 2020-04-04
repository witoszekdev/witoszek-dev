import React from "react";
import { graphql } from "gatsby";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import ProjectCard from "../../components/ProjectCard";

export default function ProjectsPage({ data }) {
  const projects = data.allMdx.nodes;
  return (
    <Layout>
      {projects.map(({frontmatter: project}) => (
        <ProjectCard imgData={project.frontImg.childImageSharp.fluid} name={project.title} description={project.shortDesc} link={`/projects${project.slug}`} />
      ))}
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
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
