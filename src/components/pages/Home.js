import React from 'react'
import Layout from '../Layout'
import { InstagramLogin } from "@amraneze/react-instagram-login";
import instagram from './../../assets/1658587303instagram-png.png'
function Home() {

  const responseInstagram = (response) => {
    console.warn(response);
  };


  const clientId = "827238338930101";
  const redirectUrl = "https://insta-tracker.onrender.com/";
  return (
    <Layout>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <img src={instagram} alt="" className='home-insta__image' />
        <div className='mt-2'>
          <h1 className='text-center mb-2'>Instagram Mentions Tracking  </h1>
          <h2>Automatically Collect Posts & Stories your brand gets mentioned in</h2>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center mt-3">
        <InstagramLogin
          clientId={clientId}
          onSuccess={responseInstagram}
          onFailure={responseInstagram}
          redirectUri={redirectUrl}
          scope="user_profile,user_media,publish_video,pages_show_list,instagram_basic,instagram_content_publish,pages_read_engagement"
          useRedirect={false}
        >
          <i className="fab fa-instagram fa-lg"></i>
          <span> Login with Instagram</span>
        </InstagramLogin>
        <div className='mt-4'>
          <p>please Note: You will be redirected to facebook where you can select the instagram business profile</p>
        </div>
      </div>
    </Layout>
  )
}

export default Home