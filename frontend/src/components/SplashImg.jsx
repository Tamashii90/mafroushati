import React, { useState } from "react";

export default function SplashImg() {
  const [ready, setReady] = useState(false);
  return (
    <>
      <img
        src="https://i.imgur.com/OgG8O0a.jpg"
        style={{
          width: "calc(100vw - 17px)",
          display: "block",
          margin: "0 auto",
          visibility: ready ? "visible" : "hidden"
        }}
        onLoad={() => setReady(true)}
      />
      {/* <ReactPlaceholder
        showLoadingAnimation
        type="rect"
        ready={true}
        color="gray"
        style={{
          width: "calc(100vw - 17px)",
          height: "auto"
        }}
      >
        <img
          src="https://i.imgur.com/OgG8O0a.jpg"
          alt="Welcome to Mafroushati !"
          style={{
            width: "calc(100vw - 17px)",
            height: "auto"
          }}
        />
      </ReactPlaceholder> */}
    </>
  );
}
