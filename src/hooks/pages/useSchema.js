import { useStaticQuery, graphql } from "gatsby"

export const useSchema = () => {
    const data = useStaticQuery(graphql`
        query Schema{
            allWp {
                nodes {
                    seo {
                        schema {
                        logo {
                            mediaItemUrl
                        }
                        siteUrl
                        siteName
                        companyOrPerson
                        }
                        social { 
                        otherSocials
                        }
                    }
                }
            } allWpPage {
                nodes {
                uri
                seo {
                    schema {
                    raw
                    }
                }
                }
            }
            allWpPost {
                nodes {
                uri

                seo {
                    schema {
                    raw
                    pageType
                    articleType
                    }
                }
                author {
                    node {
                    nodeType
                    name
                    seo {
                        title
                    }
                    avatar {
                        height
                        width
                        url
                    }
                    }
                }
                }
            }
        } 
    `)

    return data;
}