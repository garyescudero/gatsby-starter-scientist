module.exports = {
  pathPrefix: "/~willerth",
  siteMetadata: {
    author: "Stephanie Willerth",
    description:
      "Interdisciplinary tissue engineering and regenerative medicine research lab",
    siteUrl: "https://www.engr.uvic.ca/~willerth",
    title: "Willerth Laboratory",
    // List of link buttons to include on the landing image. Delete this field
    // and/or all entires if you do not want these links.
    // options: 'contact', 'opportunities', 'people', 'publications', 'research'
    primaryLinks: [
      "research",
      "opportunities",
      "people",
      "publications",
      "contact",
      "Dr. Willerth",
    ],
    // List of PubMed IDs to include on the publication page. Delete this field
    // and/or all entires if you do not want the publication page.
    publications: [],
    googleScholarUserID: "-rY-_JoAAAAJ",
    serpAPIKey:
      "26db680e17cdea6dbc6a86cb7c7a91e5adaff27c6e80623217505dda4c113aff",
    // An array of links to display in the page footer. Include as many as you like
    // (not just the ones here). If either the link or text is missing,
    // it will not be shown. Delete this field and/or all entires to disable
    // footer links.
    footerLinks: [
      { text: "Twitter", link: "https://twitter.com/DrWillerth" },
      {
        text: "Google Scholar",
        link: "https://scholar.google.ca/citations?user=-rY-_JoAAAAJ",
      },
      {
        text: "LinkedIn",
        link: "https://ca.linkedin.com/in/stephanie-willerth-2473587b",
      },
    ],
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-styled-components",
    "gatsby-transformer-remark",
    `gatsby-transformer-csv`,
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "gatsby-starter-scientist",
        short_name: "scientist",
        start_url: "/",
        background_color: "#3d8183",
        theme_color: "#3d8183",
        display: "standalone",
        icon: "src/images/favicon-32.png",
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown",
        path: `${__dirname}/src/markdown`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: "gatsby-plugin-use-dark-mode",
      options: {
        classNameDark: "dark-mode",
        classNameLight: "light-mode",
        storageKey: "darkMode",
        minify: true,
      },
    },
  ],
}
