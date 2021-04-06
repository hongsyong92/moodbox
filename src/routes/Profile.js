import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyMoods = async () => {
    const moods = await dbService
      .collection("moods")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    // console.log(moods.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyMoods();
  }, []);
  const onChange = (event) => {
    const { value } = event.target;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={newDisplayName}
          placeholder="display name"
        />
        <input type="submit" value="프로필 업데이트" />
      </form>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};
export default Profile;
