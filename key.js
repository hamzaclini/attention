document.addEventListener("DOMContentLoaded", () => {
    // Check if getUserMedia is supported
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Access the user's microphone
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          // Handle the microphone stream here
          console.log("Microphone stream:", stream);
  
          // You can add more logic here, such as audio recording or processing.
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
    } else {
      console.error("getUserMedia is not supported in this browser");
    }
  });