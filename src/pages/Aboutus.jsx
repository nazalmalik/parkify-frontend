import React from 'react'
import About from '../components/About'
import MissionVision from '../components/Missionvision'
import Features from '../components/Aboutfeatures'
import AboutSectionHeader from '../components/AboutSectionHeader'

const Aboutus = () => {
  return (
    <div>
    
      <AboutSectionHeader />
      <About/>
      <Features />
      <MissionVision />
    

    </div>
  )
}

export default Aboutus;