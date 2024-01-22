document.addEventListener('DOMContentLoaded', function() {
  const timelineContainer = document.getElementById('timeline-container');
  const timelineContainer2 = document.getElementById('timeline-container2');
  const playhead = document.getElementById('playhead');
  const playhead2 = document.getElementById('playhead2');
  const markerContainer = document.getElementById('marker-container');
  const markerContainer2 = document.getElementById('marker-container2');
  const playBtn = document.getElementById('playBtn');
  const stopBtn = document.getElementById('stopBtn');
  const redBtn = document.getElementById('Red');
  const blkBtn = document.getElementById('Black');
  const yelBtn = document.getElementById('Yellow');
  const bluBtn = document.getElementById('Blue');
  const audio = document.getElementById('audio');
  
  let isPlaying = false;
  let currentTime = 0;
  let intervalId;

  // Set the timeline length based on audio duration
  audio.addEventListener('loadedmetadata', function() {
    timelineContainer.style.width = `${audio.duration*10}px`;
    console.log(audio.duration);
    createMarkers();
  });

  audio.addEventListener('loadedmetadata', function() {
    timelineContainer2.style.width = `${audio.duration*10}px`;
    console.log(audio.duration);
  });

  playBtn.addEventListener('click', startTimeline);
  stopBtn.addEventListener('click', stopTimeline);
  redBtn.addEventListener('click', addRedMarker);
  yelBtn.addEventListener('click', addYellowMarker);
  blkBtn.addEventListener('click', addBlackMarker);
  bluBtn.addEventListener('click', addBlueMarker);

  function startTimeline() {
    if (!isPlaying) {
      isPlaying = true;
      intervalId = setInterval(updateTimeline, 1); // Adjust interval as needed
      audio.play();
    }
  }

  function stopTimeline() {
    if (isPlaying) {
      isPlaying = false;
      clearInterval(intervalId);
      audio.pause();
    }
  }

  function updateTimeline() {
    currentTime = audio.currentTime;
    playhead.style.left = `${(currentTime / audio.duration) * 100}%`;
    playhead2.style.left = `${(currentTime / audio.duration) * 100}%`;
  }

  function createMarkers() {
    const RmarkerTimes = [11.625, 18, 27.355, 34.31, 61,305, 80.035, 86.49, 121,71, 125.08, 134.215, 146.15]; // Yellow
    const YmarkerTimes = [19.61, 24.085, 31.605, 53.745, 67.395, 74.19, 88.34, 101.72, 131.535, 143.51, 154.24]; // Red
    const BmarkerTimes = [14.37, 36.715, 45.265, 51.265, 59.665, 71.035, 83.36, 94.31, 98.465, 107.525, 118.505, 128.315, 140.265, 151.57]; // Blue


    RmarkerTimes.forEach(markerTime => {
      createMarker(markerTime, 'red', markerContainer);
    });

    YmarkerTimes.forEach(markerTime => {
      createMarker(markerTime, 'yellow', markerContainer);
    });

    BmarkerTimes.forEach(markerTime => {
      createMarker(markerTime, 'blue', markerContainer);
    });
  }

  function createMarker(markerTime, color, container) {
    const marker = document.createElement('div');
    marker.className = 'marker';
    marker.style.left = `${(markerTime / audio.duration) * 100}%`;
    marker.style.backgroundColor = color;
    container.appendChild(marker);
  }

  function addRedMarker() {
    createMarker(audio.currentTime, 'red', markerContainer2);
  }

  function addBlueMarker() {
    createMarker(audio.currentTime, 'blue', markerContainer2);
  }

  function addBlackMarker() {
    createMarker(audio.currentTime, 'black', markerContainer2);
  }

  function addYellowMarker() {
    createMarker(audio.currentTime, 'yellow', markerContainer2);
  }

  
});
