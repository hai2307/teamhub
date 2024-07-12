import { LaunchOptions } from 'playwright';
import * as dotenv from 'dotenv';

dotenv.config();
export const browserOptions: LaunchOptions = {
  // headless: !+process.env.SHOW_BROWSER,
  slowMo: 0,
  args: [
    '--use-fake-ui-for-media-stream',
    '--use-fake-device-for-media-stream',
    '--start-maximized',
  ],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  },
};
