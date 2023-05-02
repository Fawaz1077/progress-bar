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
    transform: translateY(calc(10vh - 20px)); 
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
    background: var(--progress-anim-bar-color, linear-gradient(to left, red, yellow));
    border-radius: 5px;
    height: 60px;
    margin-top: 1px;
    position: relative;
  }
  
  
  
  .counter {
    position: absolute;
    top: 20px;
    left: 87%;
    font-size: 10px;
    font-size: 17px;
    font-family: 'Roboto Mono', monospace;
    color: #000;
  }

  .header {
    position: relative;
    left: 20px; /* Move 10px to the left */
    top: 118px; /* Move 10px up */
    text-align: left;
    font-size: 1.1rem;
    color: #555;
  }

  `;


  
  constructor() {
    super();
  
    this.progress = 0;
    this.counter = 0;
    this.isVisible = false;
    this.fillPercentage = 100;
  }

  startProgressBarAnimation() {
    const duration = parseFloat(getComputedStyle(this).getPropertyValue('--speed-of-bar')) * 1000;
    const startTime = performance.now();
    const targetWidth = this.fillPercentage;
  
    const animateProgressBar = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      this.progress = parseFloat((progress * targetWidth).toFixed(1));
  
      if (progress < 1) {
        requestAnimationFrame(animateProgressBar);
      } else {
        this.progress = targetWidth;
      }
    };
  
    requestAnimationFrame(animateProgressBar);
  }

  startCounterAnimation(target) {
    const duration = parseFloat(getComputedStyle(this).getPropertyValue('--speed-of-bar')) * 1000;
    const startTime = performance.now();

    const animateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      this.counter = parseFloat((progress * target).toFixed(2));
    
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
    <h3 class="header">${this.header}</h3>
      <div class="progress-bar-wrapper">
       <div class="progress-bar-inner">
          <div class="progress-bar-filled" style="width:${this.isVisible ? this.progress : 0}%">
          </div>
          <div class="counter">${this.isVisible ? this.counter.toFixed(2) : 0.00}s</div>
          </div>
        </div>

      `;
  }
}  

customElements.define('progress-bar', ProgressBar);
