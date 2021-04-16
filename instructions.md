# Project: Add Cookie to litElement Component which Click-Wraps Embedded YouTube Video

## Background

- I have created a litElement component which takes a YouTube video ID, presents the embedded video with a click-wrap overlay which acts as a gateway to accessing the embedded video.
- When you serve the starter files, the operation of the component is obvious.

## Objective

- I want to extend this component to create/interact with a cookie.
- The component should:
  - Check if a cookie is present
  - If present and indicates that access to the embedded youtube video has been previously granted, then display the embedded video (without the click-wrap overlay).
  - If no cookie is present, then guard the embedded youtube video with the clickwrap overlay.
    - If/when the user clicks the button to accept YouTube's policies, then remove the click-wrap overlay to provide access to the video, and create a cookie indicating that the user has accepted YouTube's policies.
    - The cookie should expire, say 90 days.
- I don't know anything about cookies.  I'm looking for the expert to adivse on any other concerns:
  - I understand cookies can be of different types for gdpr.  This should be 'necessary' for my website to operate.
  - I've heard of SamSite, but don't know what it means.

## Key Starter Files

- youtube-container.js
  - File containing the 'youtube-nocookie-container' litElement component.
- index.html
  - Shows usage of the 'youtube-nocookie-container' component.

## Building/Serving

No build requirements. You can simply serve with something like live-server from /public.