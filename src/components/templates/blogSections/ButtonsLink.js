import React from 'react'
import BookDemoBtn from '../../common/BookDemoBtn'

const ButtonsLink = ({ data }) => {
    return (
        <div className='col-lg-10 mx-auto px-lg-4 dmt-70'>
            {data &&
                <BookDemoBtn title={data.title} extraClass="btnXX" />
            }
        </div>
    )
}

export default ButtonsLink
