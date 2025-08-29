# Google Event from Selected Text Chrome Extension

This Chrome extension allows you to create a Google Calendar event from selected text on any webpage.

## Setup

Before you can use this extension, you need to configure it with your own Google Cloud Platform OAuth 2.0 Client ID.

1.  **Create a Google Cloud Project:** If you don't have one already, create a new project in the [Google Cloud Console](https://console.cloud.google.com/).
2.  **Enable the Google Calendar API:** In your project, go to the "APIs & Services" > "Library" and search for "Google Calendar API". Enable it for your project.
3.  **Create an OAuth 2.0 Client ID:**
    *   Go to "APIs & Services" > "Credentials".
    *   Click "Create Credentials" and select "OAuth client ID".
    *   Choose "Chrome App" as the application type.
    *   Give it a name (e.g., "Calendar Extension").
    *   Enter your extension's ID in the "Application ID" field. You can get this from the `chrome://extensions` page once you've loaded the extension in developer mode.
    *   Click "Create".
4.  **Update the `manifest.json` file:**
    *   Copy the "Client ID" that was just created.
    *   Open the `manifest.json` file in this extension's directory.
    *   Replace `"YOUR_CLIENT_ID.apps.googleusercontent.com"` with your actual client ID.
5.  **Load the extension in Chrome:**
    *   Open Chrome and navigate to `chrome://extensions`.
    *   Enable "Developer mode".
    *   Click "Load unpacked" and select the directory where you've saved this extension.

## How to Use

1.  Select any text on a webpage.
2.  Right-click on the selected text.
3.  Choose "Create Google Calendar Event" from the context menu.
4.  If you're not already logged in, you'll be prompted to sign in to your Google account and grant permissions.
5.  A notification will appear confirming that the event has been created. The event will be added to your primary calendar, starting at the current time and lasting for one hour.