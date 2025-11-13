import React, { useState } from 'react';
import Hero from '../components/Hero'
import AboutPreview from '../components/AboutPreview'
import ServicesPreview from '../components/ServicesPreview'
import GalleryPreview from '../components/GalleryPreview'
import SimpleImageCarousel from '../components/ImageCarousel'
import Events from '../components/Events'
import YouTubeCards from '../components/YoutubeCards'
import ContactPreview from '../components/ContactPreview'
//import TNMap from "../components/TNMap";
//import RightPanel from "../components/RightPanel";

const HomePage = () => {
  
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ paddingTop: '80px' }}>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <GalleryPreview />
      <SimpleImageCarousel />
      <Events />
     {/* <div className="container my-5">
        <h2 className="section-title text-center mb-4">
          Tamil Nadu Zone Map
        </h2>
        <div className="tn-map-wrap">
          <TNMap onSelect={setSelected} />
          <RightPanel selected={selected} />
        </div>
      </div> */}
      <YouTubeCards />
      <ContactPreview />
    </div>
  )
}

export default HomePage