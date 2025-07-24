import * as WebBrowser from 'expo-web-browser';
import { WebBrowserOpenOptions } from 'expo-web-browser';

// Define your desired browser theme options once
const browserOptions: WebBrowserOpenOptions = {
  toolbarColor: '#000000', // Black background for the bar
  controlsColor: '#FFFFFF', // White for the "Done" button
};

/**
 * Opens a URL in the in-app browser with a consistent dark theme.
 * @param {string} url The URL to open.
 */
export const openDarkBrowser = (url: string) => {
  WebBrowser.openBrowserAsync(url, browserOptions);
};



/// I want to use this to change the url color when typing on phone web, come back after questionaire if needed