// Getting the elements from the DOM
const recordButton = document.getElementById('recordButton');
const audioPlayback = document.getElementById('audioPlayback');
const recordingsList = document.getElementById('recordingsList');

let mediaRecorder;
let audioChunks = [];
let isRecording = false;

// Toggle recording on and off
recordButton.addEventListener('click', async () => {
    if (!isRecording) {
        // Start Recording
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.start();
        recordButton.textContent = 'SOS';
        recordButton.classList.add('recording');
        isRecording = true;

        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);

            // Play the recorded audio
            audioPlayback.src = audioUrl;

            // Create a downloadable link for the recording
            const downloadLink = document.createElement('a');
            downloadLink.href = audioUrl;
            downloadLink.download = 'recording.wav';
            downloadLink.textContent = 'Download Recording';

            recordingsList.innerHTML = ''; // Clear previous recordings
            recordingsList.appendChild(downloadLink);

            // Clear the audio chunks for the next recording
            audioChunks = [];
        };
    } else {
        // Stop Recording
        mediaRecorder.stop();
        recordButton.textContent = 'SOS';
        recordButton.classList.remove('recording');
        isRecording = false;
    }
});