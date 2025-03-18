import { useStaticQuery, graphql } from "gatsby";

export const useBlog = () => {
    const data = useStaticQuery(graphql`
        query Blog {
            allWpCategory(sort: {name: ASC}, skip: 0, limit: 5) {
                nodes {
                    name
                }
            }
            allWpPost {
                edges {
                    node {
                        seo {
                            title
                            metaDesc
                        }
                        slug
                        link
                        title
                        categories {
                            nodes {
                                name
                            }
                        }
                        content
                        featuredImage {
                            node {
                                mediaItemUrl
                                localFile {
                                    childImageSharp {
                                        gatsbyImageData(quality: 90, formats: NO_CHANGE, placeholder: BLURRED)
                                    }
                                }
                            }
                        }
                        ACF_blogpage {
                            fieldGroupName
                            prefix
                            time
                            flexibleContent {
                                ... on WpPost_AcfBlogpage_FlexibleContent_Heading {
                                    heading
                                }
                                ... on WpPost_AcfBlogpage_FlexibleContent_Content {
                                    content
                                }
                                ... on WpPost_AcfBlogpage_FlexibleContent_ListView {
                                    lists {
                                        list
                                    }
                                }
                                ... on WpPost_AcfBlogpage_FlexibleContent_Image {
                                    imageGroup {
                                        imageType
                                        image {
                                            mediaItemUrl
                                        }
                                        video {
                                            mediaItemUrl
                                        }
                                        vimeo
                                        youtube
                                    }
                                }
                                ... on WpPost_AcfBlogpage_FlexibleContent_BlogSlider {
                                    blogImageSlider {
                                        blogImage {
                                            mediaItemUrl
                                            localFile {
                                                childImageSharp {
                                                    gatsbyImageData
                                                }
                                            }
                                        }
                                    }
                                }
                                ... on WpPost_AcfBlogpage_FlexibleContent_Buttons {
                                    buttonLink {
                                        title
                                        url
                                    }
                                }
                                ... on WpPost_AcfBlogpage_FlexibleContent_DownloadPdf {
                                    downloadData {
                                        title
                                        url
                                    }
                                } 
                            }
                        }
                    }
                }
            }
        }
    `)
    return data;
}     