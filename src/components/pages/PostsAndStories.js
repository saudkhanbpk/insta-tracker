import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Posts from '../Posts';
import { useNavigate } from 'react-router-dom'
function PostsAndStories({ userProfile, userMedia }) {
  const navigate = useNavigate();
  const [page, setPage] = useState('post')

  const handleLogout = () => {
    localStorage.clear();
    navigate('/')

  }
  return (
    <>
      <Navbar className="" style={{ borderBottom: "solid black 1px" }}>
        <Container fluid>
          <Navbar.Text>
            <span className='loggedInUser'>Connected: {userProfile?.username}</span>
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
      <div className="container">
        <div className="row">
          <div className="col-12">


          </div>
        </div>
      </div>
      {page === "post" && <Posts userMedia={userMedia} />}
      {/* {page === "story" && <Stories userProfile={userProfile} />} */}
    </>
  )
}

export default PostsAndStories