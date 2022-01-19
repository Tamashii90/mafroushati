import React from "react";

export default function AboutBody() {
	return (
		<div className="container text-center">
			<h2>Notice</h2>
			<p>
				<strong>This website isn't real.</strong> It was made for educational purposes.
				<br />
				Despite what the footer says, Mafroushati&nbsp;
				<strong>isn't a real company.</strong>
			</p>
			<ul className="text-left mt-5">
				<li>
					The logo was made with the help of&nbsp;
					<a href="https://www.freelogodesign.org/" target="_blank">
						freelogodesign.org
					</a>
					.
				</li>
				<li className="mt-2">
					Images were taken from&nbsp;
					<a href="https://unsplash.com/" target="_blank">
						unsplash.com
					</a>
					&nbsp;and&nbsp;
					<a href="https://hipwallpaper.com" target="_blank">
						hipwallpaper.com
					</a>
					.
				</li>
			</ul>
		</div>
	);
}
