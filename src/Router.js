import React from 'react'
import {
  Route,
  BrowserRouter,
  Routes
} from 'react-router-dom'
import Home from './components/pages/Home'
import PostsAndStories from './components/pages/PostsAndStories'
import Header from './components/Navbar'
function Router() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts-and-stories" element={<PostsAndStories />} />
          {/* <Route path="/influencers" element={<Influencers />} />
          <Route path="/influential-fans" element={<InfluentialFans />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/free-tools" element={<FreeTools />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router