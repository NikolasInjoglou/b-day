const hintsIstanbul = [
  "Η πόλη αυτή έχει δει ανατολή και δύση να συναντιούνται πάνω από το ίδιο νερό.",
  "Στο παρελθόν, ήταν κλειδί για την κυριαρχία μιας μεγάλης περιοχής.",
  "Οι τοίχοι της κρύβουν μυστικά, θρύλους και αρχαία ψηφιδωτά.",
  "Η μυρωδιές των δρόμων της σε ταξιδεύει σε άλλες εποχές.",
  "Θα δεις κατασκευές που υψώνονται στον ορίζοντα και μαγεύουν κάθε επισκέπτη.",
  "Η νυχτερινή της ζωή σε καλεί με φώτα που καθρεφτίζονται στα νερά.",
  "Μικρά πλοιάρια ταξιδεύουν στα νερά που τη διασχίζουν, συνδέοντας ανατολή και δύση.",
  "Το όνομά της άλλαξε μαζί με την ιστορία.",
  "Τα γλυκά της συνδέονται με φιστίκι και σιρόπι, και δεν ξεχνιούνται εύκολα.",
  "Ο προορισμός σου είναι:...",
  "Κωνσταντινούπολη!"
];

const backgroundsIstanbul = [
  "url('img/i/1.jpg')", "url('img/i/2.jpg')", "url('img/i/3.jpg')",
  "url('img/i/4.png')", "url('img/i/5.jpg')", "url('img/i/6.webp')",
  "url('img/i/7.png')", "url('img/i/8.jpg')", "url('img/i/9.jpg')",
  "url('img/black.png')", "url('img/i/10.jpg')"
];

// Placeholder για Μαρακές
const hintsMarrakesh = [
  "Αρχικά, τα χρώματα θυμίζουν αμμόλοφους και ήλιο.",
  "Η ζωή στους δρόμους είναι γεμάτη μυρωδιές και ήχους.",
  "Παλιά κτήρια κρύβουν αυλές και μικρές πλατείες.",
  "Οι τοπικές αγορές ζωντανεύουν με χειροτεχνίες.",
  "Μυρωδιές μπαχαρικών και φρέσκων καρπών σε ακολουθούν.",
  "Η κουλτούρα συνδέει παράδοση και σύγχρονη τέχνη.",
  "Μικρές γειτονιές σε καλούν να χαθείς στους δρόμους τους.",
  "Οι κήποι και τα συντριβάνια φέρνουν δροσιά.",
  "Το όνομά της παραπέμπει σε μακρινές θάλασσες και έρημο.",
  "Ο προορισμός σου είναι:...",
  "Μαρακές!"
];

const backgroundsMarrakesh = [
  "url('img/m/1.avif')", "url('img/m/2.jpg')", "url('img/m/3.webp')",
  "url('img/m/4.jpg')", "url('img/m/5.jpg')", "url('img/m/6.jpeg')",
  "url('img/m/7.jpeg')", "url('img/m/8.webp')", "url('img/m/9.jpg')",
  "url('img/black.png')", "url('img/m/10.jpg')"
];

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const intro = document.getElementById("introScreen");
  const game = document.getElementById("gameWrapper");
  const music = document.getElementById("bgMusic");

  startBtn.addEventListener("click", () => {
    intro.style.opacity = "0";
    setTimeout(() => {
      intro.style.display = "none";
      game.style.display = "flex"; // δείχνουμε το παιχνίδι
      music.play(); // ξεκινά η μουσική
    }, 1000); // 1s fade
  });
});

let stepI = 0;
let stepM = 0;

const hintI = document.getElementById("hintIstanbul");
const hintM = document.getElementById("hintMarrakesh");
const nextI = document.getElementById("nextIstanbul");
const prevI = document.getElementById("prevIstanbul");
const nextM = document.getElementById("nextMarrakesh");
const prevM = document.getElementById("prevMarrakesh");
const halfI = document.getElementById("istanbul");
const halfM = document.getElementById("marrakesh");
const bgMusic = document.getElementById("bgMusic");

bgMusic.play().catch(() => console.log("Μουσική μπλοκαρίστηκε"));


// ---- Update Κωνσταντινούπολη ----
function updateHintI() {
  hintI.style.opacity = 0;
  setTimeout(() => {
    hintI.textContent = hintsIstanbul[stepI];
    halfI.style.backgroundImage = backgroundsIstanbul[stepI];
    hintI.style.opacity = 1;

    prevI.style.display = stepI === 0 ? "none" : "inline-block";
    nextI.style.display = stepI === hintsIstanbul.length - 1 ? "none" : "inline-block";

    if (stepI === hintsIstanbul.length - 1) {
      changeMusic("audio/ist.mp3");
    }
  }, 300);
}

function changeMusic(src) {
  if (bgMusic.src.includes(src)) return;
  bgMusic.src = src;
  bgMusic.play().catch(() => console.log("Autoplay μπλοκαρίστηκε"));
}


function nextHintI() { if (stepI < hintsIstanbul.length - 1) { stepI++; updateHintI(); } }
function prevHintI() { if (stepI > 0) { stepI--; updateHintI(); } }



// ---- Update Μαρακές ----
function updateHintM() {
  hintM.style.opacity = 0;
  setTimeout(() => {
    hintM.textContent = hintsMarrakesh[stepM];
    halfM.style.backgroundImage = backgroundsMarrakesh[stepM];
    hintM.style.opacity = 1;

    prevM.style.display = stepM === 0 ? "none" : "inline-block";
    nextM.style.display = stepM === hintsMarrakesh.length - 1 ? "none" : "inline-block";

    if (stepM === hintsMarrakesh.length - 1) {
      changeMusic("audio/marak.mp3");
    }
  }, 300);
}

document.getElementById("startBtn").addEventListener("click", () => {
  const music = document.getElementById("bgMusic");
  music.muted = false;   // ξε-σιωπημένο πλέον
  music.play();
  document.getElementById("introScreen").style.display = "none";
  document.querySelector(".wrapper").style.display = "flex";
});

function nextHintM() { if (stepM < hintsMarrakesh.length - 1) { stepM++; updateHintM(); } }
function prevHintM() { if (stepM > 0) { stepM--; updateHintM(); } }


nextI.addEventListener("click", nextHintI);
prevI.addEventListener("click", prevHintI);
nextM.addEventListener("click", nextHintM);
prevM.addEventListener("click", prevHintM);

// Αρχικοποίηση
updateHintI();
updateHintM();
