import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Posts from '../Posts';
import { useNavigate } from 'react-router-dom'
function PostsAndStories({ userProfile, mentioned }) {
  const navigate = useNavigate();
  const [page, setPage] = useState('post')

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate('/home')

  }
  return (
    <>
      <Navbar className="" style={{ borderBottom: "solid black 1px" }}>
        <Container fluid>
          <Navbar.Text>
            <span className='loggedInUser'>Connected: {userProfile?.short_name}</span>
          </Navbar.Text>          <Navbar.Toggle />
          <div className='menu_links'
            onClick={() => setPage('story')}
          >Story Mentions</div>
          <div className='menu_links'
            onClick={() => setPage('post')}
          >Posts Mentions</div>
          <Navbar.Collapse className="justify-content-end">
            <button className='button__disconnect' onClick={handleLogout}>Disconnect</button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {page === "post" && <Posts mentioned={mentioned} />}
      {/* {page === "story" && <Stories userProfile={userProfile} />} */}
    </>
  )
}

export default PostsAndStories