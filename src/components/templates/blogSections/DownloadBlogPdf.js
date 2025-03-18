import React from 'react'
import Svg from '../../ui/Svg'
import axios from 'axios'
import fileDownload from 'js-file-download'

const DownloadBlogPdf = ({ data }) => {
      const handleDownload = (url) => {
        axios.get(url, {  mode: "no-cors",responseType: 'blob', })
            .then((res) => {
                fileDownload(res.data, url.split('/').pop())
            })
            .catch((err) => {
                console.error("Download failed:", err)
            })
    }

    return (
        <div className='col-lg-10 mx-auto px-lg-4 dmb-75'>
            {data.map((item,i) => (
                <button key={i} onClick={() => handleDownload(item.url)} className='download-data bg-grayThree res-radiusXM radiusL border-grayOne w-100 d-flex align-items-center justify-content-between tk-degular fw-semibold text-black fontXM res-fontXX px-3 px-lg-4 cursor-pointer dmb-15'
                >
                    {item.title}
                    <div className='download-arrow bgprimary rounded-pill d-flex align-items-center justify-content-center'>
                        <Svg ButtonArrow />
                    </div>
                </button>
            ))
            }
        </div>
    )
}

export default DownloadBlogPdf
