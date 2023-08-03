import React, { useEffect, useState } from 'react'
import { InstagramLogin } from "@amraneze/react-instagram-login";
import instagram from './../../assets/1658587303instagram-png.png'
import axios from 'axios';
import PostsAndStories from './PostsAndStories';
function Home() {
  const [userProfile, setUserProfile] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [accessToken, setAccessToken] = useState("")

  let accessToken1 = "IGQVJXZAWtoZAWE0ejJodDE5RXUyWXMwd0c3eWpUeDZA0UXRSVk9nelh0MmxyVDYxRHNUcS14Rklmck5meWFIaHBlb2hPS3ZAUelVSMy1wUFh1b3FqLU1QbFZAoQjJva2ZAtWWlXS2l3WHZAoNlVzcDNIZAWU2MgZDZD"
  const clientId = "797315068796639";
  const redirectUrl = "https://insta-tracker.onrender.com/";
  const clientSecret = "66eb181eb7668deae16feb1fa41d342b";

  const exchangeCodeForToken = async (code) => {
    try {
      const response = await fetch('https://api.instagram.com/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          redirect_uri: redirectUrl,
          code: code,
        }),
      });

      const data = await response.json();
      console.log(data)
      // Extract the access token from the response
      const token = data.access_token;
      setAccessToken(token)
      // Now you can use the access token to make authorized API calls
      console.log('Access Token:', token);
    } catch (error) {
      console.error('Error exchanging code for token:', error);
    }
  };
  const responseInstagram = (response) => {
    if (response) {
      exchangeCodeForToken(response)      // getUserProfileData(response);
      localStorage.setItem("accessToken", response);
    }
    console.log("res in home", response);
  };

  console.log("accessToken", accessToken)

  const getUserProfileData = () => {
    axios.get(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`)
      .then(response => {
        setUserProfile(response.data);
      })
      .catch(error => {
        console.error(error);
        setUserProfile(null);
      });
  };

  // const getUserMedia = () => {
  //   axios.get(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${accessToken}`)
  //     .then(response => {
  //       console.log(response.data);
  //       // setUserProfile(response.data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       // setUserProfile(null);
  //     });
  // }



  useEffect(() => {
    getUserProfileData();
    // getUserMedia();
  }, [])

  useEffect(() => {
    let user = localStorage.getItem("accessToken");
    if (user) {
      setUserToken(user);
    }
  }, []);


  return (
    <>
      {
        userToken ? (
          <PostsAndStories userProfile={userProfile} />

        ) : (
          <>
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
                scope="user_profile,user_media, instagram_graph_user_profile, instagram_graph_user_media, instagram_graph_user_media"
              >
                <i className="fab fa-instagram fa-lg"></i>
                <span> Login with Instagram</span>
              </InstagramLogin>
              <div className='mt-4'>
                <p>please Note: You will be redirected to facebook where you can select the instagram business profile</p>
              </div>
            </div>
          </>
        )
      }
    </>

  )
}

export default Home