import React from 'react'
import { removeTags } from '../../../utils/helpers'

const BlogContent = ({ data }) => {
    return (
        <div className='col-lg-10 mx-auto px-lg-4'>
            <h4 className='tk-degular fw-medium text-black fontXX res-fontLM res-leadingXS leadingXM tmb-35 dmb-45'>
                {removeTags(data)}
            </h4>
        </div>
    )
}

export default BlogContent
