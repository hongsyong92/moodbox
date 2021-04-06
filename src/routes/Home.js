import Mood from "components/Mood";
import MoodForm from "components/MoodForm";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 375px;
  margin: 0 auto;
  padding-top: 50px;
`;

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
      <Container>
        <MoodForm userObj={userObj} />
        {moods.map((item) => (
          <Mood
            key={item.id}
            moodObj={item}
            isOwner={item.creatorId === userObj.uid}
          />
        ))}
      </Container>
    </>
  );
};
export default Home;
