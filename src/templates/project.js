import React from 'react'
import Img from "gatsby-image"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import {FiClock} from "react-icons/fi";
import {MDXRenderer} from "gatsby-plugin-mdx";

export default ({pageContext: {body, frontmatter}}) => {
  return <Layout>
    <h2>{frontmatter.title}</h2>
    <Img fluid={frontmatter.frontImg.childImageSharp.fluid} />
    <span><FiClock/> {frontmatter.created}</span>
    <MDXRenderer>{body}</MDXRenderer>
  </Layout>
  // return <pre>{JSON.stringify(pageContext, null, 2)}</pre>
}