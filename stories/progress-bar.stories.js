import { html } from 'lit';
import '../src/progress-bar.js';

export default {
  title: 'ProgressBar',
  component: 'progress-bar',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <progress-bar
      style="--progress-bar-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </progress-bar>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
