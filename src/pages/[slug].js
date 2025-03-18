import React from 'react'
import Layout from '../layout';
import { usePageBuilder } from '../hooks/pages/usePageBuilder';
import ContentSection from '../components/templates/ContentSection';

const Dynamic = ({ slug }) => {
    const data = usePageBuilder();

    const pageBySlug = data.allWpPage.nodes.find(e => e.slug === slug);

    return (
        <>
            {data.allWpPage.nodes ? (
                pageBySlug ? (
                    <Layout pageSlug={slug}>
                        <ContentSection pageSlug={slug} />
                    </Layout>
                ) : (
                    <div className='d-flex flex-column align-items-center justify-content-center page-not-found bgprimary'>
                        <h2 className='tk-degular fw-semibold fontLS text-center text-white mb-4'>
                            404
                        </h2>
                        <h5 className='tk-degular fontSX text-white'>Page not Found</h5>
                    </div>
                )
            ) : (<div className='loading'><div className="bg-transparent w-100 h-100 d-flex align-items-center justify-content-center fontXM text-black">Loading...</div></div>)}
        </>
    )
}

export default Dynamic
