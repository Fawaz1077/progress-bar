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
  `;

  constructor() {
    super();
    this.progressBars = [];
  }

  async connectedCallback() {
    super.connectedCallback();
    const response = await fetch('./data.json');
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
      ${this.progressBars.map(
        (bar) =>
          html`<h2>${bar.header}</h2>
          <progress-bar
            style="--speed-of-bar: ${bar.duration}s"
            .fillPercentage=${bar.fillPercentage}
          ></progress-bar>`
      )}
    `;
  }
}

customElements.define('scroll-down', ScrollDown);
