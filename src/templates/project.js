/* @jsx jsx */
import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { jsx } from "@theme-ui/core";
import { Heading, Divider } from "@theme-ui/components";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import { FiClock } from "react-icons/fi";
import { MDXRenderer } from "gatsby-plugin-mdx";
import ProjectDataLabel from "../components/ProjectDataLabel";
import TechnologyBadge from "../components/TechnologyBadge";

export default ({ pageContext: { body, frontmatter } }) => {
  return (
    <Layout>
      <Heading as="h2" sx={{ fontSize: "2rem", paddingBottom: "1rem" }}>
        {frontmatter.title}
      </Heading>
      <div sx={{ display: "grid", gridTemplateColumns: ["1fr", "1fr 1fr"], gridColumnGap: ['2', '3', '4'] }}>
        <div>
          <ProjectDataLabel icon={FiClock} label="Created">
            {frontmatter.created}
          </ProjectDataLabel>
          <ProjectDataLabel label="Used technologies">
            <div
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                fontFamily: "sans",
                "& > div": { marginRight: "2", marginBottom: "1" },
              }}
            >
              {frontmatter.technologies.map((name) => (
                <TechnologyBadge key={name} name={name} />
              ))}
            </div>
          </ProjectDataLabel>
          <p>{frontmatter.shortDesc}</p>
        </div>
        <GatsbyImage
          image={frontmatter.frontImg.childImageSharp.gatsbyImageData}
          sx={{ boxShadow: "lg" }} />
      </div>
      <Divider sx={{ marginTop: "2.5rem", marginBottom: "1.5rem" }} />
      <article>
        <MDXRenderer>{body}</MDXRenderer>
      </article>
    </Layout>
  );
};
