function showAlert() {
  const alert = document.getElementById('customAlert');
  alert.classList.add('show');
  
  setTimeout(() => {
      alert.classList.remove('show');
  }, 5000);
}
function toggleSection() {
  const mainSection = document.getElementById('main');
  mainSection.classList.toggle('slide-up');
  showAlert();
}

document.addEventListener("DOMContentLoaded", function () {
const cake = document.querySelector(".cake");
const candleCountDisplay = document.getElementById("candleCount");
let candles = [];
let audioContext;
let analyser;
let microphone;
let audio = new Audio('hbd.mp3');


function updateCandleCount() {
const activeCandles = candles.filter(
(candle) => !candle.classList.contains("out")
).length;
candleCountDisplay.textContent = activeCandles;
}

function addCandle(left, top) {
const candle = document.createElement("div");
candle.className = "candle";
candle.style.left = left + "px";
candle.style.top = top + "px";

const flame = document.createElement("div");
flame.className = "flame";
candle.appendChild(flame);

cake.appendChild(candle);
candles.push(candle);
updateCandleCount();
}

cake.addEventListener("click", function (event) {
const rect = cake.getBoundingClientRect();
const left = event.clientX - rect.left;
const top = event.clientY - rect.top;
addCandle(left, top);
});

function isBlowing() {
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
analyser.getByteFrequencyData(dataArray);

let sum = 0;
for (let i = 0; i < bufferLength; i++) {
sum += dataArray[i];
}
let average = sum / bufferLength;

return average > 50; //ETO CHANGEEEEEE
}

function blowOutCandles() {
let blownOut = 0;

// Only check for blowing if there are candles and at least one is not blown out
if (candles.length > 0 && candles.some((candle) => !candle.classList.contains("out"))) {
if (isBlowing()) {
candles.forEach((candle) => {
if (!candle.classList.contains("out") && Math.random() > 0.5) {
  candle.classList.add("out");
  blownOut++;
}
});
}

if (blownOut > 0) {
updateCandleCount();
}

// If all candles are blown out, trigger confetti after a small delay
if (candles.every((candle) => candle.classList.contains("out"))) {
setTimeout(function() {
triggerConfetti();
endlessConfetti(); // Start the endless confetti
}, 200);
audio.play();
}
}
}



if (navigator.mediaDevices.getUserMedia) {
navigator.mediaDevices
.getUserMedia({ audio: true })
.then(function (stream) {
audioContext = new (window.AudioContext || window.webkitAudioContext)();
analyser = audioContext.createAnalyser();
microphone = audioContext.createMediaStreamSource(stream);
microphone.connect(analyser);
analyser.fftSize = 256;
setInterval(blowOutCandles, 200);
})
.catch(function (err) {
console.log("Unable to access microphone: " + err);
});
} else {
console.log("getUserMedia not supported on your browser!");
}
});

function triggerConfetti() {
confetti({
particleCount: 100,
spread: 70,
origin: { y: 0.6 }
});
}

function endlessConfetti() {
setInterval(function() {
confetti({
particleCount: 200,
spread: 90,
origin: { y: 0 }
});
}, 1000);
}

const audio = document.getElementById('audio');
const playButton = document.querySelector('.play-button');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');

function togglePlay() {
  if (audio.paused) {
      audio.play();
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
  } else {
      audio.pause();
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
  }
}

// Reset button when audio ends
audio.addEventListener('ended', () => {
  playIcon.style.display = 'block';
  pauseIcon.style.display = 'none';
  
});

function toggleSection() {
const mainSection = document.getElementById('main');
mainSection.classList.toggle('slide-up');
showAlert();
}

const texts = ['Halo sengkuu....', 'Aku puya sesuatu buat kamu....', 'Pokoknya mah spesial buat Winda seorang hehe....','----Made With LOVE----'];
const typingText = document.querySelector('.typing-text');
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100; // Kecepatan mengetik (ms)
let deletingDelay = 50; // Kecepatan menghapus (ms)
let newTextDelay = 2000; // Jeda sebelum mengetik teks baru (ms)

function type() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
      // Menghapus karakter
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = deletingDelay;
  } else {
      // Mengetik karakter
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 100;
  }

  // Logika untuk mengatur loop
  if (!isDeleting && charIndex === currentText.length) {
      // Selesai mengetik, mulai menghapus setelah jeda
      typingDelay = newTextDelay;
      isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
      // Selesai menghapus, pindah ke teks berikutnya
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
  }

  setTimeout(type, typingDelay);
}

// Mulai animasi
type();

// Fungsi untuk mengecek dukungan API
function checkBrowserSupport() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      // Untuk browser lama yang mungkin menggunakan prefix vendor
      navigator.mediaDevices = {};
      navigator.mediaDevices.getUserMedia = navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia;

      if (!navigator.mediaDevices.getUserMedia) {
          alert('Maaf, browser Anda tidak mendukung akses mikrofon. ' +
                'Silakan gunakan browser modern seperti Chrome, Firefox, atau Safari versi terbaru.');
          return false;
      }
  }
  return true;
}

// Fungsi untuk meminta izin akses mikrofon
async function requestMicrophonePermission() {
  const button = document.getElementById('micButton');

  // Cek dukungan browser terlebih dahulu
  if (!checkBrowserSupport()) {
      console.error('Browser tidak mendukung getUserMedia API');
      return false;
  }

  try {
      // Meminta izin menggunakan getUserMedia API
      const stream = await navigator.mediaDevices.getUserMedia({
          audio: true // Hanya meminta akses audio/mikrofon
      });
      
      // Jika berhasil mendapat izin
      console.log('Izin mikrofon diberikan');
      return true;
  } catch (error) {
      // Tangani berbagai jenis error
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          alert('Izin mikrofon ditolak. Mohon berikan izin melalui pengaturan browser Anda.');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
          alert('Tidak ada perangkat mikrofon yang terdeteksi pada sistem Anda.');
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
          alert('Mikrofon Anda mungkin sedang digunakan oleh aplikasi lain.');
      } else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
          alert('Mikrofon Anda tidak memenuhi persyaratan teknis yang diperlukan.');
      } else {
          alert('Terjadi kesalahan saat mengakses mikrofon: ' + error.message);
      }
      console.error('Error detail:', error);
      button.disabled = false;
      return false;
  }
}

// Tambahkan event listener ke tombol
document.getElementById('micButton').addEventListener('click', requestMicrophonePermission);
