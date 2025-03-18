import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Svg from '../../ui/Svg';

export default function BlogImageSlider({ data }) {
    return (
        <div>
            {data &&
                <div className='blog-image-slider position-relative dmt-75 dmb-60 tmb-110'>
                    <div className='arrow-buttons d-flex align-items-center justify-content-center justify-content-lg-end position-absolute bottom-0 start-100 ps-lg-4'>
                        <div className='image-swiper-button-prev h-100 w-100 mx-1 cursor-pointer'>
                            <Svg SwiperPrevArrow />
                        </div>
                        <div className='image-swiper-button-next h-100 w-100 mx-1 cursor-pointer'>
                            <Svg SwiperPrevArrow />
                        </div>
                    </div>
                    <Swiper
                        effect='fade'
                        fadeEffect={{ crossFade: true }}
                        navigation={{
                            nextEl: ".blog-image-slider .image-swiper-button-next",
                            prevEl: ".blog-image-slider .image-swiper-button-prev",
                            disabledClass: "swiper-button-disabled"
                        }}
                        modules={[Navigation]}
                    >
                        {data.map((post, i) => (
                            <SwiperSlide key={i}>
                                <div className='blog-open-img overflow-hidden radiusXX' data-aos='fade-up' data-aos-easing="linear" data-aos-duration="500">
                                    {post?.blogImage?.localFile?.childImageSharp ? (
                                        <GatsbyImage image={getImage(post?.blogImage?.localFile)} className='w-100 h-100 object-cover' alt='' imgStyle={{ quality: 100 }} />
                                    ) : (
                                        <img src={post?.blogImage?.mediaItemUrl} className='w-100 h-100 object-cover' alt='' />
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            }
        </div>
    )
}