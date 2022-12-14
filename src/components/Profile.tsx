import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { ProfileInitial } from "./ProfileInitial";

export const Profile = () => {
  const [userName, setUserName] = useState("Nothing So far");
  const [userProfileLink, setUserProfileLink] = useState("Nothing So far");

  useEffect(() => {
    let receivedUserName = auth.currentUser?.displayName;
    let receivedUserProfile = auth.currentUser?.photoURL;

    onAuthStateChanged(auth, (user) => {
      setUserName(receivedUserName ? receivedUserName : "Not Logged In");
      setUserProfileLink(receivedUserProfile ? receivedUserProfile : "");
    });
  });
  return (
    <NavLink className="btn-profile" to={"/account"}>
      <div className="profile-left">
        <div className="profile-img">
          {userProfileLink && <img src={userProfileLink} alt="user profile" />}
          {!userProfileLink && <ProfileInitial initial={userName.charAt(0)} />}
        </div>
      </div>
      <div className="profile-text nav-link-text">
        <div className="profile-name">{userName}</div>
        <div className="profile-plan">Premium</div>
      </div>
    </NavLink>
  );
};
