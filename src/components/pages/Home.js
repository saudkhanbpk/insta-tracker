import React, { useEffect, useState } from 'react'
import { InstagramLogin } from "@amraneze/react-instagram-login";
import instagram from './../../assets/1658587303instagram-png.png'
import axios from 'axios';
import PostsAndStories from './PostsAndStories';
function Home() {
  const [userProfile, setUserProfile] = useState(null);
  const [userToken, setUserToken] = useState(null)
  const responseInstagram = (response) => {
    if (response) {
      localStorage.setItem("accessToken", response);
      // getUserProfileData(response);
    }
    console.log("res in home", response);
  };

  let accessToken = "AQDqxPW41atRWgYeNUnwNin8aOs5Rm2tkwjlwJkx8Snyys3nv-uTjsZufEzXctqyDF9jdrmtv1i4YkA-qJ-4yKcoHSzyOZ-gpBQb0n-i8IDXZ5IeD0BXzweE8N2Dup2wQ-vnbKgmFT2DK9RKe1vvLAszFixefjc8yOMcVo4rSF2mdetnm0XBud6h_g2WVWgqVipLaaKBj9BNN7dlb84d95BkPgOylnpPkh9EcLONsPY1nQ"

  // console.log("userProfile", userProfile);

  const clientId = "1039996780495432";
  const redirectUrl = "https://insta-tracker.onrender.com/";

  const getUserProfileData = () => {
    axios.get(`https://graph.instagram.com/me?fields=id,username,account_type&access_token=${accessToken}`)
      .then(response => {
        console.log(response.data);
        setUserProfile(response.data);
      })
      .catch(error => {
        console.error(error);
        setUserProfile(null);
      });
  };

  useEffect(() => {
    getUserProfileData();
  }, [])

  useEffect(() => {
    let user = localStorage.getItem("accessToken");
    if (user) {
      setUserToken(user)
    }
  }, [])
  console.log("userToken", userToken);
  return (
    <>
      {
        userToken ? (
          <PostsAndStories />

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