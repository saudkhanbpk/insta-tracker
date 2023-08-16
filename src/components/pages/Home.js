import React, { useEffect, useState } from 'react'
import { InstagramLogin } from "@amraneze/react-instagram-login";
import instagram from './../../assets/1658587303instagram-png.png'
import { LoginSocialFacebook } from 'reactjs-social-login'
import { FacebookLoginButton } from 'react-social-login-buttons'
import axios from 'axios';
import PostsAndStories from './PostsAndStories';
function Home() {
  const [userProfile, setUserProfile] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [pageId, setPageId] = useState("")
  const [mentioned, setMentioned] = useState({})
  const [instagramId, setInstagramId] = useState(null)
  console.log("userProfile", userProfile)

  const user = localStorage.getItem("accessToken");
  const localProfile = localStorage.getItem("userProfile");
  const idPage = localStorage.getItem("pageId");
  const instagramIdLocal = localStorage.getItem("instagramId");
  useEffect(() => {

    if (localProfile) {
      setUserProfile(JSON.parse(localProfile));
    }
    if (user) {
      setUserToken(user);
    }
    if (idPage) {
      setPageId(idPage);
    }
    if (instagramIdLocal) {
      setInstagramId(instagramIdLocal);
    }
  }, [
    localStorage.getItem("accessToken"),
    localStorage.getItem("userProfile"),
    localStorage.getItem("pageId"),
    localStorage.getItem("instagramId")
  ]);

  // useEffect(() => {
  //   axios.get(`https://instabackend-28u5.onrender.com/webhook`)
  //     .then(response => {
  //       console.log("response", response)
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });


  // }, [])

  const handleSuccess = (response) => {
    localStorage.setItem("accessToken", response.data.accessToken);
    setUserToken(response.data.accessToken);
    localStorage.setItem("userProfile", JSON.stringify(response.data));
  }

  //get user's page
  const getUsersPage = () => {
    axios.get(`https://graph.facebook.com/v17.0/me/accounts?access_token=${user}`)
      .then(response => {
        console.log("response11", response.data.data[0].id)
        localStorage.setItem("pageId", response.data.data[0].id);
      }).catch(error => {
        console.log("error: ", error)
      })
  }


  //get user's instagram business account
  const getInstagramBusinessAccount = () => {
    axios.get(`https://graph.facebook.com/v17.0/${pageId}?fields=instagram_business_account&access_token=${user}`)
      .then(response => {
        console.log("response2222", response)
        localStorage.setItem("instagramId", response.data.instagram_business_account.id);
      }).catch(error => {
        console.log("error: ", error)
      })
  }

  console.log("instagramId", JSON.parse(instagramId))

  const mentionedMedia = () => {
    axios.get(`https://graph.facebook.com/v17.0/17841461382613033?fields=mentioned_media.media_id(17888413493826172){caption,media_type,media_url}&access_token=${user}`)
      .then(response => {
        console.log("response media", response)
        setMentioned(response.data)
      }).catch(error => {
        console.log("error: ", error)
      })
  }
  useEffect(() => {
    getUsersPage();
    getInstagramBusinessAccount();
    mentionedMedia();
  }, [])


  return (
    <>
      {
        userToken ? (
          <PostsAndStories userProfile={userProfile} mentioned={mentioned} />

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
              <LoginSocialFacebook
                appId="1693596834400518"
                onResolve={(response) => handleSuccess(response)}
                onReject={(response) => console.log(response)}
                permissions={['instagram_basic', 'pages_show_list', 'instagram_manage_insights', 'instagram_manage_comments', 'instagram_manage_messages', 'instagram_manage_videos',
                  'instagram_manage_comments', 'instagram_manage_insights', 'instagram_basic', 'pages_read_engagement', 'pages_read_user_content', 'pages_manage_metadata', 'pages_manage_posts', 'pages_manage_engagement', 'pages_manage_ads', , 'business_management']}
              >
                <FacebookLoginButton />
              </LoginSocialFacebook>
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