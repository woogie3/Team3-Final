import React from 'react';
import {Slide} from 'react-slideshow-image';
import '../css/Slide.css'

const properties = {
   duration: 5000,
   transtionDuration : 500,
   infinite: true,
   indicators: true,
   arrows: true
  }

const slideshow = () =>{
    return (
        <div className="containerSlide">
            <Slide {...properties}>
                <div className="each-slide">
                    <div>
                    <img src='/image/5.jpg' alt="slideshow" />
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                    <img src='/image/6.jpg' alt="slideshow" />
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                    <img src='/image/7.jpg' alt="slideshow" />
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                    <img src='/image/8.png' alt="slideshow" />
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                    <img src='/image/10.png' alt="slideshow" />
                    </div>
                </div>
            </Slide>
        </div>
    )
}

export default slideshow;