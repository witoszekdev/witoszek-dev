const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const mdxProjectFilesResult = await graphql(`
    query {
      allFile(
        filter: {
          sourceInstanceName: { eq: "projects" }
          extension: { eq: "mdx" }
        }
      ) {
        nodes {
          id
        }
      }
    }
  `);

  if (mdxProjectFilesResult.error) {
    reporter.panicOnBuild("ERROR: While executing project pages query");
  }

  const mdxProjectFilesIds = mdxProjectFilesResult.data.allFile.nodes.map(
    (obj) => `"${obj.id}"`
  );

  // Fetch MDX pages based on collected id's
  const mdxProjectPages = await graphql(`{
  allMdx(filter: {parent: {id: {in: [${mdxProjectFilesIds}]}}}) {
    nodes {
      id
      body
      frontmatter {
        slug
        title
        technologies
        created(formatString: "DD.MM.YYYY")
        shortDesc
        frontImg {
          childImageSharp {
            gatsbyImageData(quality: 95, placeholder: BLURRED, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
}
`);
  const projects = mdxProjectPages.data.allMdx.nodes;
  projects.forEach((project) => {
    createPage({
      path: `/projects${project.frontmatter.slug}`,
      component: path.resolve("./src/templates/project.js"),
      context: { id: project.id, body: project.body, frontmatter: project.frontmatter },
    });
  });
};
