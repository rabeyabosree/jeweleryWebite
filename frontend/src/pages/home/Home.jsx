import React from 'react'
import Navbar from './../../components/common/Navbar';
import Banner from './../../components/common/Banner';
import NewArrivals from './../../components/home/sections/NewArrivals';
import BestSellers from './../../components/home/sections/BestSellers';
import FestivalsOffers from './../../components/home/sections/FestivalsOffers';
import About from '../about/About';
import Contact from './../contact/Contact';
import LatestBlogs from './../../components/home/sections/LatestBlogs';
import FeaturesSection from '../FeaturesSection';
import Testimonials from './../Testimonals';
import Footer from './../../components/common/Footer';

function Home() {
    return (
        <div>
            <Navbar />
            <Banner />
            <NewArrivals />
            <BestSellers />
            <FestivalsOffers />
            <FeaturesSection />
            <LatestBlogs />
            <Testimonials />
            <Footer />
           
        </div>
    )
}

export default Home