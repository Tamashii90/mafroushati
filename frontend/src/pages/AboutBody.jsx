import React from "react";

export default function AboutBody() {
  return (
    <div className="container text-center">
      <p>
        <strong>This website isn't real.</strong> It was made for educational
        purposes.
        <br />
        Despite what the footer says,&nbsp;
        <strong>Mafroushati isn't a real company.</strong>
      </p>
      <h2 className="mt-5">Credits</h2>
      <ul className="mt-3">
        <li>
          The logo was made with the help of{" "}
          <a href="https://www.freelogodesign.org/" target="_blank">
            FLD.com
          </a>
          .
        </li>
        <li className="mt-2">
          The splash image isn't mine, I only added the text. I found the image
          on&nbsp;
          <a href="https://hipwallpaper.com" target="_blank">
            hipwallpaper.com
          </a>
          .
        </li>
      </ul>
    </div>
  );
}
