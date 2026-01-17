import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout);
  },
};
