import { graphql, useStaticQuery } from "gatsby";

type Props = {
  site: {
    siteMetadata: {
      siteTitle: string;
      siteTitleAlt: string;
      siteHeadline: string;
      siteUrl: string;
      siteDescription: string;
      siteLanguage: string;
      author: string;
      [key: string]: unknown;
    };
  };
};

const useSiteMetadata = () => {
  const data = useStaticQuery<Props>(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          siteTitleAlt
          siteHeadline
          siteUrl
          siteDescription
          siteLanguage
          siteAuthor
          author
        }
      }
    }
  `);

  return data.site.siteMetadata;
};

export default useSiteMetadata;
