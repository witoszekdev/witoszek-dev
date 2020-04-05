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
  // Fix for missing fragment:
  // https://github.com/gatsbyjs/gatsby/blob/26582d31ab14f7bac6d5738e4245ceca2e6d411d/packages/gatsby-transformer-sharp/src/fragments.js#L89
  const mdxProjectPages = await graphql(`
    query {
      allMdx(filter: {parent: {id: {in: [${mdxProjectFilesIds}]}}}) {
        nodes {
          id
          body
          frontmatter {
            slug
            title
            technologies
            created(formatString: "DD-MM-YYYY")
            shortDesc
            frontImg {
              childImageSharp {
                fluid(quality: 95) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
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
