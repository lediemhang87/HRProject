import { heroCarouselData } from "../../constants/homepage";
import { HeroManOne, HeroManTwo } from "../../assets/hero";
import React from "react";


const HeroCarousel = () => {
    return (
        <div className="orbit">
        <div className="center-image relative z-[10]">
            <img src={HeroManTwo} alt="hero" className="absolute transition-opacity duration-500"/>
            <img src={HeroManOne} alt="hero" className="absolute transition-opacity duration-500" />
        </div>
        <ul className="grid place-items-center md:w-48 md:h-48 w-28 h-28 relative list-none transform-origin-center animate-orbit">
        {
        heroCarouselData.map(({text, bg, icon, title}, index) => (
       <React.Fragment  key={title}>
             <li style={{backgroundColor: `${bg}`}} className="cursor-pointer absolute aspect-square rounded-full font-medium text-white text-center leading-none grid place-items-center w-full h-auto xl:max-w-[128px]  md:max-w-[90px]  max-w-[60px]">
        <div><img src={icon} alt="icon" className="w-full h-auto xl:max-w-[45px] md:max-w-[35px] max-w-[20px]"/></div>
        <p style={{color: `${text}`}} className="md:text-xs text-[10px] text-center opacity-0 transition-opacity duration-500 ease-in-out">{title}</p>
        {index === 7 &&   <span className="cursor-default pointer-events-none absolute -top-12 left-2 bg-[#aeabd8] rounded-full" style={{width: "18px", height: "18px"}}></span>}
        {index === 1 &&   <span className="cursor-default pointer-events-none first-letter:absolute -top-2 left-28 xl:left-36 bg-[#7d8fb3] rounded-full" style={{width: "18px", height: "18px"}}></span>}
        {index === 2 &&   <span className="cursor-default pointer-events-none absolute top-12 left-28 xl:left-44 xl:top-20 bg-[#f8c6c6] rounded-full" style={{width: "18px", height: "18px"}}></span>}
        {index === 4 &&   <span className="cursor-default pointer-events-none absolute top-32 left-6 xl:top-40 bg-[#aeabd8] rounded-full" style={{width: "18px", height: "18px"}}></span>}
        {index === 5 &&   <span className="cursor-default pointer-events-none absolute top-16 -left-10 bg-[#f8c6c6] rounded-full" style={{width: "18px", height: "18px"}}></span>}
        </li>
       
       </React.Fragment>
       
        ))
    }
        </ul>
    </div>
    )
}

export default HeroCarousel;
























