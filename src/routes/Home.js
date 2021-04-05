import Mood from "components/Mood";
import MoodForm from "components/MoodForm";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [moods, setMoods] = useState([]);

  // 작성된 mood 들을 가져오는 함수
  useEffect(() => {
    dbService.collection("moods").onSnapshot((snapshot) => {
      const moodArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMoods(moodArray);
    });
  }, []);

  return (
    <>
      <div>
        <MoodForm userObj={userObj} />
        {moods.map((item) => (
          <Mood
            key={item.id}
            moodObj={item}
            isOwner={item.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};
export default Home;
