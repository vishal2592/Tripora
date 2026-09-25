import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Flight from './pages/Flight'
import Hotels from './pages/Hotels'
import Packages from './pages/Packages'
import Destination from './pages/Destination'
import Offers from './pages/Offers'
import TermsAndConditions from './pages/TermAndCondition'
import RefundPolicy from './pages/RefundPolicy'
import HelpCenter from './pages/HelpCenter'
import ContactUs from './pages/ContactUs'
import Cancellation from './pages/Cancellation'
import AboutUs from './pages/AboutUs'
import Careers from './pages/Careers'
import Blog from './pages/Blog'
import Press from './pages/Press'

import HotelDetail from './pages/HotelDetails'
import HotelBookNow from './pages/HotelBookNow'
import HotelPayment from './pages/HotelPayment'
import BookingSuccess from './pages/BookingSuccess'

import FlightDetail from './pages/FlightDetail'
import FlightBook from './pages/FlightBook'
import FlightPayment from './pages/FlightPayment'
import FlightBookingSuccess from './pages/FlightBookingSuccess'

import DestinationDetail from './pages/DestinationDetail'
import Profile from './pages/Profile'
import MyBookings from './pages/MyBooking'

import PackageDetail from './pages/PackageDetail'
import PackageBooking from './pages/PackageBooking'
import PackagePayment from './pages/PackagePayment'
import PackageBookingSuccess from './pages/PackageBookingSuccess'

// ================= ADMIN =================
import AdminLayout from './Admin/components/AdminLayout'
import Dashboard from './Admin/components/pages/Dashboard'
import Bookings from './Admin/components/pages/Bookings'
import AdminFlight from './Admin/components/pages/AdminFlight'
import AdminHotel from './Admin/components/pages/AdminHotel'
import AdminPackages from './Admin/components/pages/AdminPackages'
import AdminDestination from './Admin/components/pages/AdminDestination'
import AdminOffers from './Admin/components/pages/AdminOffers'
import AdminUsers from './Admin/components/pages/AdminUser'
import AdminPayment from './Admin/components/pages/AdminPayment'
import AdminReview from './Admin/components/pages/AdminReview'
import AdminProfile from './Admin/components/pages/AdminProfile'
import AdminLogin from './Admin/components/pages/AdminLogin'
import Content from './pages/Content'


function App() {

  const location = useLocation()

  // Check whether current page is an admin page
  const isAdminRoute = location.pathname.startsWith('/admin')


  return (
    <>
      {/* ================= CLIENT NAVBAR ================= */}

      {!isAdminRoute && <Navbar />}


      {/* ================= SCROLL TO TOP ================= */}

      <ScrollToTop />


      <Routes>

        {/* =====================================================
            CLIENT SIDE ROUTES
        ===================================================== */}

        {/* ================= USER HOME ================= */}

        <Route element={<PrivateRoute role="user" />}>

          <Route
            path='/'
            element={<Home />}
          />

        </Route>


        {/* ================= AUTH ================= */}

        <Route
          path='/login'
          element={<Login />}
        />

        <Route
          path='/register'
          element={<Register />}
        />


        {/* ================= CLIENT PAGES ================= */}

        <Route
          path='/flights'
          element={<Flight />}
        />

        <Route
          path='/hotels'
          element={<Hotels />}
        />

        <Route
          path='/packages'
          element={<Packages />}
        />

        <Route
          path='/destinations'
          element={<Destination />}
        />

        <Route
          path='/offers'
          element={<Offers />}
        />

        <Route
          path='/termsandconditions'
          element={<TermsAndConditions />}
        />

        <Route
          path='/refundpolicy'
          element={<RefundPolicy />}
        />

        <Route
          path='/helpcenter'
          element={<HelpCenter />}
        />

        <Route
          path='/contact'
          element={<ContactUs />}
        />

        <Route
          path='/cancellation'
          element={<Cancellation />}
        />

        <Route
          path='/about'
          element={<AboutUs />}
        />

        <Route
          path='/careers'
          element={<Careers />}
        />

        <Route
          path='/blog'
          element={<Blog />}
        />

        <Route
          path='/press'
          element={<Press />}
        />


        {/* ================= HOTEL ROUTES ================= */}

        <Route
          path='/hoteldetails'
          element={<HotelDetail />}
        />

        <Route
          path='/hotelbook'
          element={<HotelBookNow />}
        />

        <Route
          path='/hotels/:id/payment'
          element={<HotelPayment />}
        />

        <Route
          path='/booking-success/:bookingId'
          element={<BookingSuccess />}
        />


        {/* ================= FLIGHT ROUTES ================= */}

        <Route
          path='/flights/:id'
          element={<FlightDetail />}
        />

        <Route
          path='/flight-booking/:id'
          element={<FlightBook />}
        />

        <Route
          path='/flight-payment/:bookingId'
          element={<FlightPayment />}
        />

        <Route
          path='/flight-booking-success/:bookingId'
          element={<FlightBookingSuccess />}
        />


        {/* ================= DESTINATION ================= */}

        <Route
          path='/destination/:slug'
          element={<DestinationDetail />}
        />


        {/* ================= PROFILE ================= */}

        <Route
          path='/profile'
          element={<Profile />}
        />


        {/* ================= MY BOOKINGS ================= */}

        <Route
          path='/my-bookings'
          element={<MyBookings />}
        />


        {/* ================= PACKAGE ROUTES ================= */}

        <Route
          path='/packages/:id'
          element={<PackageDetail />}
        />

        <Route
          path='/package-booking/:id'
          element={<PackageBooking />}
        />

        <Route
          path='/package-payment/:bookingId'
          element={<PackagePayment />}
        />

        <Route
          path='/package-booking-success/:bookingId'
          element={<PackageBookingSuccess />}
        />


        {/* =====================================================
            ADMIN SIDE ROUTES
        ===================================================== */}

        <Route element={<PrivateRoute role="admin" />}>

          <Route
            path='/admin'
            element={<AdminLayout />}
          >

            <Route
              index
              element={<Dashboard />}
            />

            <Route
              path='bookings'
              element={<Bookings />}
            />

            <Route
              path='adminflight'
              element={<AdminFlight />}
            />

            <Route
              path='adminhotel'
              element={<AdminHotel />}
            />

            <Route
              path='adminpackage'
              element={<AdminPackages />}
            />

            <Route
              path='admindestination'
              element={<AdminDestination />}
            />

            <Route
              path='adminoffers'
              element={<AdminOffers />}
            />

            <Route
              path='adminusers'
              element={<AdminUsers />}
            />

            <Route
              path='adminpayment'
              element={<AdminPayment />}
            />

            <Route
              path='adminreview'
              element={<AdminReview />}
            />

            <Route
              path='adminprofile'
              element={<AdminProfile />}
            />

            <Route
              path='content'
              element={<Content />}
            />

          </Route>

        </Route>


        {/* =====================================================
            ADMIN LOGIN
            This route must remain PUBLIC
        ===================================================== */}

        <Route
          path='/admin/adminlogin'
          element={<AdminLogin />}
        />

      </Routes>


      {/* ================= CLIENT FOOTER ================= */}

      {!isAdminRoute && <Footer />}

    </>
  )
}

export default App