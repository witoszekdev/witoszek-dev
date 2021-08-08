require(`dotenv`).config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    siteTitle: "witoszek.dev",
    siteTitleAlt: `Jonatan Witoszek personal website`,
    siteDescription: "Jonatan Witoszek personal website",
    siteLanguage: "en",
    siteHeadline: "Jonatan Witoszek personal website",
    siteUrl: "https://witoszek.dev",
    author: "@witoszekdev",
    siteAuthor: "Jonatan Witoszek",
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      options: {
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: "Projects",
            slug: "/projects",
          },
          {
            title: "Contact Me",
            slug: "/contact",
          },
        ],
        externalLinks: [
          {
            name: "Github",
            url: "https://github.com/taniotanio7",
          },
          {
            name: `Twitter`,
            url: `https://twitter.com/witoszekdev`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.gstatic.com`],
        interval: 300,
        timeout: 30000,
        web: [
          {
            name: `IBM Plex Sans`,
            file: `https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap`,
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "projects",
        path: `${__dirname}/content/projects`,
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `witoszek.dev – Jonatan Witoszek personal website`,
        short_name: `witoszek.dev`,
        description: `Personal blog of Jonatan Witoszek`,
        start_url: `/`,
        background_color: `#1A202C`,
        theme_color: `#CBD5E0`,
        display: `standalone`,
        icon: "static/favicon.svg",
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-mailgo",
      options: {
        mailgoConfig: {
          dark: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-simple-analytics",
      options: {
        domain: "sa.witoszek.dev",
        trackPageViews: true,
      },
    },
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
  ],
};
