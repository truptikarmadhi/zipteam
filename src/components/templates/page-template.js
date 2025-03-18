import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { usePageBuilder } from "../../hooks/pages/usePageBuilder";
import { useSchema } from "../../hooks/pages/useSchema";

const PageTemplate = ({ pageSlug }) => {
    const data = usePageBuilder();
    const pages = data?.allWpPage?.edges;
    const pageIndex = data?.allWpPage?.nodes?.findIndex(node => node?.slug?.toLowerCase()?.includes(pageSlug));
    const page = pages[pageIndex]?.node;
    const dataSchema = useSchema();
    const seo = dataSchema?.allWp?.nodes[0].seo;

    const contentSection = data?.allWpPage?.nodes[pageIndex]?.ACF_builderpage?.contentSection;
    const accordionlist = contentSection?.filter(item => item?.fieldGroupName === 'page_AcfBuilderpage_ContentSection_Accordion') || [];
    const accordion = accordionlist[0]?.accordionList;
    const route = typeof window !== 'undefined' ? window.location.pathname : ''; // Ensure we only access window in the browser
    const filterService = dataSchema?.allWpPage?.nodes?.filter(i => i.uri === route);
    const postData = dataSchema?.allWpPost?.nodes?.filter(i => i.uri === route);

    const serviceData = filterService.length !== 0 && JSON.parse(filterService[0]?.seo?.schema.raw);
    const blogPostData = postData.length !== 0 && JSON.parse(postData[0]?.seo?.schema.raw);

    const [currentLocation, setCurrentLocation] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentLocation(window.location.href);
        }
    }, []);

    const homeSchema = {
        "@context": "https://schema.org",
        "@type": seo?.schema?.siteName === 'company' ? "Organization" : seo?.schema?.siteName,
        name: seo?.schema?.siteName,
        url: seo?.schema?.siteUrl,
        logo: seo?.schema?.logo?.mediaItemUrl,
        sameAs: seo?.social?.otherSocials,
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": accordion ? accordion?.map(item => ({
            "@type": "Question",
            "name": item?.heading,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item?.description?.replace(/<\/?p>/g, '') // Remove HTML <p> tags
            }
        })) : [],
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": serviceData && serviceData["@graph"][0].name,
        "provider": {
            "@type": seo?.schema?.siteName === 'company' ? "Organization" : seo?.schema?.siteName,
            "name": seo?.schema?.siteName,
            "url": seo?.schema?.siteUrl,
        },
        "description": serviceData && serviceData["@graph"][0].description,
        "areaServed": {
            "@type": "Place",
            "name": "Global",
        },
        "serviceType": "Team Skills Development",
        "offers": {
            "@type": "Offer",
            "url": currentLocation,
            "eligibleRegion": {
                "@type": "Place",
                "name": "Global",
            },
        },
    };

    const blogSchema = {
        "@context": "https://schema.org",
        "@type": blogPostData && blogPostData["@graph"][0]?.['@type'],
        "headline": blogPostData && blogPostData["@graph"][0]?.name,
        "image": blogPostData && blogPostData["@graph"][0]?.thumbnailUrl,
        "author": {
            "@type": postData[0]?.author?.node?.nodeType,
            "name": postData[0]?.author?.node?.name,
            "worksFor": {
                "@type": seo?.schema?.siteName === 'company' ? "Organization" : seo?.schema?.siteName,
                name: seo?.schema?.siteName,
            },
        },
        "publisher": {
            "@type": seo?.schema?.siteName === 'company' ? "Organization" : seo?.schema?.siteName,
            name: seo?.schema?.siteName,
            "logo": {
                "@type": "ImageObject",
                "url": postData[0]?.author?.node?.avatar?.url,
                "width": postData[0]?.author?.node?.avatar?.width,
                "height": postData[0]?.author?.node?.avatar?.height,
            },
        },
        "mainEntityOfPage": {
            "@type": postData[0]?.seo?.schema?.pageType[0],
            "@id": currentLocation,
        },
        "description": blogPostData && blogPostData["@graph"][0]?.description,
        "articleSection": "Business",
        "inLanguage": blogPostData && blogPostData["@graph"][0]?.inLanguage,
        "about": {
            "@type": "Thing",
            "name": "Data-driven strategies",
        },
    };

    const schema = (route.startsWith("/blog/") && route.length > 6)
        ? blogSchema
        : (route === "/digital-teams/" || route === "/for-teams/" || route === "/for-professional-services-teams/")
        ? faqSchema
        : (route === "/data-driven-skills/" || route === "/build-your-dream-team/" || route === "/master-collaboration/")
        ? serviceSchema
        : homeSchema;
    return (
        <>
            <Helmet>
                <title>{page?.seo?.title}</title>
                <meta name="description" content={page?.seo?.metaDesc} />
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
                <script defer data-domain="zipteam.com" src="https://plausible.io/js/script.js"></script>
            </Helmet>
        </>
    );
};

export default PageTemplate;