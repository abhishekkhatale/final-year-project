import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";

const Room = () => {
  const meetingContainer = useRef(null);
  const { lectureId } = useParams();

  useEffect(() => {
    const appID = 1923271987;
    const serverSecret = "4de3dcfb4f410b87ea104ee5ab0cd08f";

    const storedUser = sessionStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userName = user?.name || "Anonymous User";

    const userId = sessionStorage.getItem("userId") || Date.now().toString();
    sessionStorage.setItem("userId", userId);

    const roomId = lectureId;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      userId,
      userName
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: meetingContainer.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      showScreenSharingButton: true,
      showPreJoinView: false,
    });
  }, [lectureId]);

  return (
    <div className="bg-[#1c1f2e] w-screen h-screen flex justify-center items-center relative overflow-hidden">
      <div
        ref={meetingContainer}
        className="w-full h-[90vh] mt-10 shadow-lg overflow-hidden"
      />
    </div>
  );
};

export default Room;
