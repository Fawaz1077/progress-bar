import { LitElement, html, css } from 'lit';

class ProgressBar extends LitElement {
  static properties = {
    header: { type: String },
    progress: { type: Number },
    counter: { type: Number },
    isVisible: { type: Boolean },
    fillPercentage: { type: Number },
  };

  static styles = css`
  :host {
    display: block;
    text-align: center;
  }

  .progress-bar-wrapper {
    position: relative;
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

  .progress-bar-filled {
    background: orange;
    border-radius: 5px;
    height: 60px;
    margin-top: 1px;
    animation: progress-bar-filled var(--speed-of-bar, 5s) linear forwards;
  }

  @keyframes progress-bar-filled {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }

  .counter {
    position: absolute;
    top: 20px;
    left: 87%;
    font-size: 20px;
  }
`;


  constructor() {
    super();
    this.header = 'Progression of Life';
    this.progress = 0;
    this.counter = 0;
    this.isVisible = false;
    this.fillPercentage = 100;
  }

  startProgressBarAnimation() {
    this.progress = this.fillPercentage;
  }

  startCounterAnimation(target) {
    const duration = parseFloat(getComputedStyle(this).getPropertyValue('--speed-of-bar')) * 1000;
    const startTime = performance.now();

    const animateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      this.counter = Math.floor(progress * target);

      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      } else {
        this.counter = target;
      }
    };

    requestAnimationFrame(animateCounter);
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            this.startProgressBarAnimation();
            this.startCounterAnimation(this.fillPercentage);
            observer.unobserve(this);
            this.requestUpdate();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(this);
  }

  updated(changedProperties) {
    if (changedProperties.has('fillPercentage') && !this.isVisible) {
      this.setupIntersectionObserver();
    }
  }

  render() {
    return html`
      <div class="progress-bar-wrapper">
        <div class="progress-bar-inner">
          <div class="progress-bar-filled" style="width:${this.isVisible ? this.progress : 0}%"></div>
        </div>
        <div class="counter">${this.isVisible ? this.counter : 0}s</div>
      </div>
    `;
  }
  }



customElements.define('progress-bar', ProgressBar);
