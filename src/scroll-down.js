import { LitElement, html, css } from 'lit';
import './progress-bar.js';

class ScrollDown extends LitElement {
  static properties = {
    progressBars: { type: Array },
  };

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
    }

    .filler-content {
      height: 120vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #f0f0f0;
      padding: 1rem;
      box-sizing: border-box;
    }

    h1 {
      font-size: 2rem;
      text-align: center;
    }

    .title {
      font-size: 24px;
      font-weight: bold;
      margin-top: 100px; 
      margin-bottom: 30px;
      text-align: center;
    }
    
    
    .subheading {
      font-size: 18px;
      margin-bottom: 20px;
      text-align: center;
      color: #333;
    }

    .gradient-font {
      font-size: 3em; 
      background: linear-gradient(to right, #FFB266, #FFA500, #FF6600);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
    }

    
  `;

  constructor() {
    super();
    this.progressBars = [];
  }

  async connectedCallback() {
    super.connectedCallback();
    const url = new URL('../assets/data.json', import.meta.url).href;
    const response = await fetch(url);
    const data = await response.json();
    this.progressBars = data.map((bar) => {
      return {
        header: bar.header,
        fillPercentage: bar.fillPercentage,
        duration: bar.duration || 5,
      };
    });
  }

  render() {
    return html`
      <div class="filler-content">
        <h1>Filler Content</h1>
        <p>Scroll down to see the progress bars in action.</p>
      </div>
      <h2 class="title gradient-font">Blazing fast build speed</h2>
      <h2 class="subheading">
        Combining TypeScript and Rust with a parallelized architecture to bring you the ultimate developer experience.
      </h2>
      ${this.progressBars.map(
        (bar) =>
          html`
          <progress-bar
          
          header=${bar.header}
            style="--speed-of-bar: ${bar.duration}s"
            .fillPercentage=${bar.fillPercentage}
          ></progress-bar>`
      )}
    `;
  }
  
}

customElements.define('scroll-down', ScrollDown);
