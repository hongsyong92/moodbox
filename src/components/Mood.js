import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Mood = ({ moodObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newMood, setNewMood] = useState(moodObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (ok === true) {
      // 삭제
      await dbService.doc(`moods/${moodObj.id}`).delete();
      await storageService.refFromURL(moodObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onChange = (event) => {
    const { value } = event.target;
    setNewMood(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`moods/${moodObj.id}`).update({
      text: newMood,
    });
    setEditing(false);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  value={newMood}
                  placeholder="수정"
                  onChange={onChange}
                  required
                />
                <input type="submit" value="적용" />
              </form>
              <button onClick={toggleEditing}>취소</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{moodObj.text}</h4>
          {moodObj.attachmentUrl && (
            <div>
              <img
                src={moodObj.attachmentUrl}
                width="100px"
                height="100px"
                alt="attachment img"
              />
            </div>
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>삭제</button>
              <button onClick={toggleEditing}>수정</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Mood;
