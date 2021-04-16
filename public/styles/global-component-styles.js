/* fd-preserve-global.js */

/* This file is assembled by copyPublicToDistWithTemplates.py during the build process */

import { css } from '../web_modules/lit-element.js'; // eslint-disable-line import/extensions

export const globalComponentStyles = css`
/* init.css */
html {
  font-size: var(--font-size);
  font-family: var(--font-family);
}

html, body, main {
  padding: 0;
  margin: 0;
}

body {
  background-color: white;
}

div, h1, h2, h3, h4, h5, h6, p, small, section, span, i, button {
  margin: 0em;
  padding: 0em;
}

/* text.css */
ul {
  list-style-position: outside;
}

ul, li {
  font-size: 1rem;
  line-height: 1rem;
  padding: 0rem;
  margin: 0rem;
  padding-top: 0rem;
  padding-bottom: 0rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

ul {
  padding-left: 1rem;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 1.2rem;
  margin-bottom: 0.7rem;
  font-weight: bold;
}

h1 {
  font-size: 2rem;
  text-align: center;
}

h2 {
  font-size: 1.5rem;
}

h3 {
  font-size: 1.125rem;
}

h4 {
  font-weight: normal;
  text-decoration: underline;
}

p {
  font-size: 1rem;
  margin-top: 0.7rem;
  margin-bottom: 0.7rem;
  line-height: 1rem;
}

small {
  font-size: 0.8rem;
}

hr {
  height: 2px;
  border: none;
  background-color: var(--themecolor-dark);
}
/* MEDIA QUERIES ============================== */

@media (hover: hover) {
  a:hover {
    background-color: var(--themecolor-hover);
    cursor: pointer;
  }
}

/* containers.css */
main {
  margin: 0.7rem;
}

.video-container {
    overflow: hidden;
    position: relative;
    width:100%;
}

.video-container::after {
    padding-top: 56.25%;
    display: block;
    content: '';
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

@media screen and (min-width: 1200px) {
  main {
    max-width: 1200px;
    margin: auto;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    padding-bottom: 0.7rem;
  }
}

/* io-forms-buttons.css */
input, label {
  border-radius: 0px;
  margin: 0px;
  padding: 0.5rem;
}

input {
  border-color: var(--themecolor-dark);
  border-style: solid;
  border-width: 1px;
}

button {
  /* flex:1; */
  margin: 0rem;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  border: solid;
  border-width: 4px;
  border-radius: var(--button-border-radius);
  font-family: var(--font-family);
  font-size: var(--font-size); 
  box-shadow: 2px 2px 6px 0px  rgba(0,0,0,0.3);
}

button.active {
  background-color: var(--themecolor-dark);
  border-color: var(--themecolor-dark);
  color: white;
}

button.inactive {
  background-color: var(--themecolor-hover);
  border-color: rgba(160, 88, 88, 0);;
  color: var(--themecolor-dark);
  /* color: yellow; */
}

span.caret-block {
  display: inline-block;
  width: 20px;
  text-align: center;
  font-size: 0.7rem;
}

/* Remove the up/down arrows in corner of input box */
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* input:required:invalid {
  border-left-width: 5px;
  border-left-color: var(--themecolor-alert);
}

label {
  border-style: solid;
  border-color: var(--themecolor-light);
  border-width: 1px;
  background-color: var(--themecolor-light);
} */


/* MEDIA QUERIES ============================== */

@media (hover: hover) {
  button.active:hover {
    border-color: var(--brandcolor);
    cursor: pointer;
  }
}

/* cards.css */
.cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.75rem;
  align-items: stretch;
}
.cards-grid > article {
  border: 1px solid #ccc;
  box-shadow: 2px 2px 6px 0px  rgba(0,0,0,0.3);
  /* padding: 1rem; */
  border-radius: 1rem;
  /* background-color: var(--themecolor-light); */
  /* prep flex to place button at bottom of flexbox */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
}
.cards-grid > article > div { 
  text-align: center;
}
.cards-grid > article > div > h3 {
  margin: 0px;
  margin-top: 0.7rem;
  padding: 0px;
}
.cards-grid > article > div > div > p {
  text-align: left;
}
.cards-grid > article > div > div > ul {
  text-align: left;
}
.cards-grid > article > div > div > ol {
  text-align: left;
}
.cards-grid > article > div > .cards-headerTag {
  font-style: italic;
  text-align: center;
}
.cards-grid > article > div > ul {
  text-align: left;
}
.cards-grid > article > div > ol {
  text-align: left;
}
.cards-grid > article img {
  max-width: 100%;
  /* border-radius: 1rem; */
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
.cards-grid > article .inner-horizontal-padding{
  padding-left: 1rem;
  padding-right: 1rem;
}
.cards-grid > article .cards-bottom {
  margin-top: 2rem;
}
.cards-grid > article > .cards-bottom button {
  width: 100%;
}
@media screen and (min-width: 767px) {
  .cards-col2 {
    grid-template-columns: 1fr 1fr;
  }
  .cards-col3 {
    grid-template-columns: 1fr 1fr 1fr;
  }
  /* init.css */
  
  /* text.css */
  
  /* containers.css */
  
  /* io-forms-buttons.css */
  
  /* cards.css */
`;
