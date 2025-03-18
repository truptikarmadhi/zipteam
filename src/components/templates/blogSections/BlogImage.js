import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap';
import BookDemoBtn from '../../common/BookDemoBtn';
import Svg from '../../ui/Svg';

export default function BlogImage({ data }) {
    const [show, setShow] = useState(false);
    const videoRef = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (show && videoRef.current) {
            videoRef.current.play().catch(error => console.error("Video autoplay failed:", error));
        }
    }, [show])

    useEffect(() => {
        const html = document.querySelector("html");

        if (show) {
            html.style.overflow = "hidden";
        } else {
            html.style.overflow = "auto";
        }
    }, [show]);

    const shouldShowBookDemoBtn = data.imageType === "Video" && data.video ||
        data.imageType === "Youtube" && data.youtube ||
        data.imageType === "Vimeo" && data.vimeo;


    return (
        <>
            <div className='open-blog-images overflow-hidden radiusXX dmt-75 dmb-60' data-aos='fade-up' data-aos-easing="linear" data-aos-duration="500">
                <div className='h-100 position-relative'>
                    {data.image?.localFile?.childImageSharp ?
                        (
                            <GatsbyImage
                                image={getImage(data.image.localFile)}
                                className="w-100 h-100 object-cover"
                                alt=""
                                imgStyle={{ quality: 100 }}
                            />
                        ) : (
                            <img
                                src={data.image?.mediaItemUrl}
                                className="w-100 h-100 object-cover"
                                alt=""
                            />
                        )
                    }
                    {shouldShowBookDemoBtn && (
                        <div className='position-absolute bottom-0 end-0 pe-4 dpb-25'>
                            <BookDemoBtn
                                onClick={handleShow}
                                title="Play Full Video"
                                extraClass="btn-bg-white show-video-btn"
                            />
                        </div>
                    )}

                    {show &&
                        <Modal show={show} onHide={handleClose} className='fancybox-modal' centered>
                            <div type="button" className="modal-close rounded-circle dmb-25 d-inline-flex justify-content-end" data-bs-dismiss="modal" onClick={handleClose}>
                                <Svg modalClose />
                            </div>
                            <div className='modal-video'>
                                {data.imageType === "Video" ? data.video && (
                                    <video
                                        ref={videoRef}
                                        playsinline autoplay muted loop class="h-100 w-100 object-cover">
                                        <source src={data.video.mediaItemUrl} type="video/mp4" />
                                    </video>
                                ) : data.imageType === "Youtube" ? data.youtube && (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`${data.youtube}?autoplay=1&mute=1&controls=0`}// Directly use the YouTube embed URL
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>

                                ) : data.imageType === "Vimeo" ? data.vimeo && (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`${data.vimeo}?autoplay=1&mute=1&controls=0`}// Directly use the YouTube embed URL
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : null
                                }
                            </div>
                        </Modal>
                    }
                </div>
            </div>
        </>
    )
}
