const crypto = require("crypto")
const { request } = require("gaxios")

const getPublications = require("./scripts/publications/index")

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = [
    schema.buildObjectType({
      name: "FooterLink",
      fields: {
        link: "String",
        text: "String",
      },
      interfaces: ["Node"],
    }),
    schema.buildObjectType({
      name: "Frontmatter",
      fields: {
        email: "String",
        name: "String",
        order: "Int",
        title: "String",
      },
      interfaces: ["Node"],
    }),
    schema.buildObjectType({
      name: "MarkdownRemark",
      fields: {
        frontmatter: "Frontmatter",
      },
      interfaces: ["Node"],
    }),
    schema.buildObjectType({
      name: "Publication",
      fields: {
        authors: "[String]",
        journal: "String",
        issue: "String",
        pages: "String",
        pmid: "Int",
        title: "String",
        volume: "String",
        year: "Int",
      },
      interfaces: ["Node"],
    }),
    schema.buildObjectType({
      name: "Publications",
      fields: {
        list: {
          type: "[Publication]",
          resolve: source => source.list || [],
        },
      },
      interfaces: ["Node"],
    }),
    schema.buildObjectType({
      name: "GoogleScholarPublication",
      fields: {
        authors: "String",
        title: "String",
        year: "String",
        link: "String",
        publication: "String",
      },
      interfaces: ["Node"],
    }),
    schema.buildObjectType({
      name: "GoogleScholarPublications",
      fields: {
        list: {
          type: "[GoogleScholarPublication]",
          resolve: source => source.list || [],
        },
      },
      interfaces: ["Node"],
    }),
    schema.buildObjectType({
      name: "SiteMetadata",
      fields: {
        footerLinks: {
          type: "[FooterLink]",
        },
        publications: {
          type: "[Int]",
          resolve: source => source.primaryLinks || [],
        },
        primaryLinks: {
          type: "[String]",
          resolve: source => source.primaryLinks || [],
        },
      },
      interfaces: ["Node"],
    }),
    schema.buildObjectType({
      name: "Site",
      fields: {
        siteMetadata: "SiteMetadata",
      },
      interfaces: ["Node"],
    }),
    schema.buildObjectType({
      name: "PeopleCsv",
      fields: {
        order: "Int",
        name: "String",
        title: "String",
        category: "String",
        //  image: "String",
        current_alumni: "String",
        description: "String",
        email: "String",
      },
      interfaces: ["Node"],
    }),
  ]
  createTypes(typeDefs)
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: require.resolve("@babel/plugin-proposal-optional-chaining"),
  })
}

const parseGSArticles = gsArticles => {
  return gsArticles.map(gsArticle => ({
    authors: gsArticle.authors,
    title: gsArticle.title,
    year: gsArticle.year,
    link: gsArticle.link,
    publication: gsArticle.publication,
  }))
}

const fetchGSArticles = async (userId, serpAPIKey) => {
  const resultArticles = Array()
  let moreArticles = true

  let i = 0
  while (moreArticles) {
    const response = await request({
      url: `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${userId}&hl=en&sort=pubdate&num=100&api_key=${serpAPIKey}&start=${
        100 * i
      }`,
    })

    resultArticles.push(...parseGSArticles(response.data.articles))

    moreArticles = response.data.articles.length == 100
    i++
  }

  return resultArticles
}

exports.sourceNodes = async ({ actions: { createNode }, getNode }) => {
  const { siteMetadata } = getNode("Site")

  const publications =
    siteMetadata.publications && siteMetadata.publications.length > 0
      ? await getPublications(siteMetadata.publications)
      : []

  createNode({
    id: "publications",
    parent: null,
    list: publications,
    internal: {
      contentDigest: crypto
        .createHash("md5")
        .update(JSON.stringify(publications))
        .digest("hex"),
      type: "Publications",
    },
  })

  const googleScholarPublications =
    siteMetadata.googleScholarUserID && siteMetadata.serpAPIKey
      ? await fetchGSArticles(
          siteMetadata.googleScholarUserID,
          siteMetadata.serpAPIKey
        )
      : []

  createNode({
    id: "googleScholarPublications",
    parent: null,
    list: googleScholarPublications,
    internal: {
      contentDigest: crypto
        .createHash("md5")
        .update(JSON.stringify(googleScholarPublications))
        .digest("hex"),
      type: "GoogleScholarPublications",
    },
  })
}
