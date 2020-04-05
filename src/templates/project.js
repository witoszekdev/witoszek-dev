/* @jsx jsx */
import React from "react";
import Img from "gatsby-image";
import { jsx } from "@theme-ui/core";
import { Heading, Divider } from "@theme-ui/components";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import { FiClock } from "react-icons/fi";
import { MDXRenderer } from "gatsby-plugin-mdx";
import ProjectDataLabel from "../components/ProjectDataLabel";

export default ({ pageContext: { body, frontmatter } }) => {
  return (
    <Layout>
      <Heading as="h2" sx={{ fontSize: "2rem", paddingBottom: "1rem" }}>
        {frontmatter.title}
      </Heading>
      <div sx={{ display: "grid", gridTemplateColumns: ["1fr", "1fr 1fr"] }}>
        <div>
          <ProjectDataLabel icon={FiClock} label="Created">
            {frontmatter.created}
          </ProjectDataLabel>
          <p>{frontmatter.shortDesc}</p>
        </div>
        <Img
          fluid={frontmatter.frontImg.childImageSharp.fluid}
          sx={{ boxShadow: "lg" }}
        />
      </div>
      <Divider sx={{marginTop: '2.5rem', marginBottom: '1.5rem'}} />
      <article>
        <MDXRenderer>{body}</MDXRenderer>
      </article>
    </Layout>
  );
  // return <pre>{JSON.stringify(pageContext, null, 2)}</pre>
};
