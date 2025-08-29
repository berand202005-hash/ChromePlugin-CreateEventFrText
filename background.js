chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "create-event",
    title: "Create Google Calendar Event",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "create-event") {
    const selectedText = info.selectionText;

    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError || !token) {
        console.error(chrome.runtime.lastError);
        return;
      }

      const now = new Date();
      const end = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour later

      const event = {
        'summary': selectedText,
        'start': {
          'dateTime': now.toISOString(),
          'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        'end': {
          'dateTime': end.toISOString(),
          'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      };

      fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Error creating event:', data.error);
        } else {
          console.log('Event created:', data);
          // Optionally, notify the user that the event was created.
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon128.png',
            title: 'Event Created',
            message: `Event "${selectedText}" has been added to your primary calendar.`
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  }
});

// Add a listener for notifications to work.
// The permission is implicitly granted when requesting it for other APIs.
chrome.notifications.onClicked.addListener((notificationId) => {
    // a web page to the calendar event could be opened here
});
