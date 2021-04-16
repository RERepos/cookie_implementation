/* fd-preserve-global.js */

import { LitElement, html, css } from '../web_modules/lit-element.js'; // eslint-disable-line import/extensions
import { globalComponentStyles } from '../styles/global-component-styles.js'; // eslint-disable-line import/extensions

class youtubeNocookieContainer extends LitElement {
  static get properties() {
    return {
      vidID: { type: String },
    };
  }
  constructor() {
    super();
    // this.url = '';
    this.vidID = '';
  }
  static get styles() {
    return [
      globalComponentStyles,
      css`
        /* comments must be in this form */
        button.active {
          background-color: white;
          color: black;
        }
      `,
    ];
  }
  render() {
    return html`
      <div style="
        margin-top: 0.7rem;
        margin-bottom: 0.7rem;
      ">
        <div id="div2" style="
          z-index: 1;
          position: absolute;
        ">
        </div>
        <div id="div1" style="
          z-index: -2;
          background:rgba(0,0,0,0.6);
        ">
          <div id="divVid" class="video-container" style="z-index: -3;">
            <iframe src='https://www.youtube-nocookie.com/embed/${this.vidID}'
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
        </div>
      </div>
    `;
  }
  firstUpdated() {
    setTimeout(() => {
      this._drawDiv2();
    }, 500);
    window.addEventListener('resize', () => {
      this._drawDiv2();
    });
  }
  _drawDiv2() {
    const rect = this.shadowRoot.getElementById('div1').getBoundingClientRect();
    this.shadowRoot.getElementById('div2').style.width = `${rect.width}px`;
    this.shadowRoot.getElementById('div2').style.height = `${rect.height}px`;

    this.shadowRoot.getElementById('div2').innerHTML = `
      <div style="
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        color: white;
      ">
        <div>
        </div>
        <div style="
          margin: 0.7rem;
        ">
          <p><span style="background-color: black">By clicking 'play' on an embedded YouTube video, you are consenting to their Terms and Privacy/Cookie policies.</span></p>
          <button id="acceptBtn" class="active">Accept and Continue</button>
        </div>
      </div>
    `;
    this.shadowRoot.getElementById('acceptBtn').addEventListener('click', () => {
      this.shadowRoot.getElementById('div2').style.zIndex = '-8';
      this.shadowRoot.getElementById('divVid').style.zIndex = '2';
    });
  }
}

customElements.define('youtube-nocookie-container', youtubeNocookieContainer);
