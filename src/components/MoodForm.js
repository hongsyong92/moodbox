import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";

const MoodForm = ({ userObj }) => {
  const [mood, setMood] = useState("");
  const [attachment, setAttachment] = useState("");

  // onSubmit 및 mood 작성하는 함수
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const moodObj = {
      text: mood, // 이거는 위에있는 state mood 임
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("moods").add(moodObj);
    setMood("");
    setAttachment("");
  };

  // onChange 함수
  const onChange = (event) => {
    const { value } = event.target;
    setMood(value);
  };
  const onFileChange = (event) => {
    const { files } = event.target;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  // 사진 업로드 취소
  const onClearAttachment = () => setAttachment("");
  return (
    <form onSubmit={onSubmit}>
      <input
        value={mood}
        onChange={onChange}
        type="text"
        placeholder="What's your mood?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Enter" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" alt="mood img" />
          <button onClick={onClearAttachment}>업로드 취소 </button>
        </div>
      )}
    </form>
  );
};

export default MoodForm;
