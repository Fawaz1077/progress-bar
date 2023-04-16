import { LitElement, html, css } from 'lit';

const logo = new URL('../assets/open-wc-logo.svg', import.meta.url).href;

class ProgressBar extends LitElement {
  static properties = {
    header: { type: String },
    progress: { type: Number },
  }

  static styles = css`
    :host {
  
      display: block;
      text-align: center;
    }
  
    .progress-bar-wrapper {
      display: flex;
      justify-content: center;
      transform: translateY(calc(45vh - 80px));
    width: 100%;
      
    }

    

.progress-bar-inner {
  border-radius: 5px;
  width: 70%;
  height: 60px;
  background-color: #ddd;
  margin-bottom: 10px;
}


.progress-bar-filled{
  background: orange;
  border-radius: 5px;
  height: 60px;
  margin-top: 1px;
  animation: progress-bar-filled var(--speed-of-bar, 5s) linear forwards;
}
@keyframes progress-bar-filled{
  0% {width: 0%; }
  100% {width: 100%; }
}
  `;

  constructor() {
    super();
    this.header = 'Progression of Life';
    this.progress = 0;
  }

  render() {
    return html`
    <div class="progress-bar-wrapper"> 
  
      <div class="progress-bar-inner">
        <div class="progress-bar-filled" style="width:${this.progress}%"></div>
        
      </div>
      </div>
      
    `;
  }
}

customElements.define('progress-bar', ProgressBar);
