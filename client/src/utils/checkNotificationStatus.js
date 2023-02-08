export const checkNotificationStatus = (message, user) => {
  if (!("Notification" in window)) {
    alert("Your browser doesnt support notifications");
  } else if (Notification.permission === "granted") {
    sendNotification(message, user);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission((permission) => {
      if (permission === "granted") {
        sendNotification(message, user);
      }
    });
  }
};

export const sendNotification = (message, user) => {
  new Notification(message);
};
