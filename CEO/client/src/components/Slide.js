import React from 'react';
import {Slide} from 'react-slideshow-image';
import img2 from '../imges/5.jpg';
import img1 from '../imges/6.jpg';
import img3 from '../imges/7.jpg';
import img4 from '../imges/11.jpg';
import img5 from '../imges/12.jpg';
import img6 from '../imges/15.jpg';
import '../css/Slide.css';

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
                        <img src = {img1} alt ="img1"/>
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img src = {img2} alt ="img2"/>
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img src = {img3} alt ="img3"/>
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img src = {img4} alt ="img4"/>
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img src = {img5} alt ="img5"/>
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img src = {img6} alt ="img6"/>
                    </div>
                </div>
            </Slide>
        </div>
    )
}

export default slideshow;