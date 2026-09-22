import React from 'react'
import HeroSection from '../components/HeroSection'
import PopularDestinations from '../components/PopularDestination'
import ExclusiveDeals from '../components/ExclusiveDeals'
import HolidayPackages from '../components/HolidayPackage'
import TravelTypes from '../components/TravelTypes'
import RecommendedHotels from '../components/RecommendedHotel'
import AITravelPlanner from '../components/AITravelPlanner'
import WhyChooseTripora from '../components/WhyChooseTripora'
import TravelInspiration from '../components/TravelInsipration'
import Testimonials from '../components/Testimonials'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <PopularDestinations />
      <ExclusiveDeals />
      <HolidayPackages />
      <TravelTypes />
      <RecommendedHotels />
      <AITravelPlanner />
      <WhyChooseTripora />
      <TravelInspiration />
      <Testimonials />
    </div>
  )
}

export default Home