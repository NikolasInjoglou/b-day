// ----- Τα δικά σου δεδομένα (όπως τα έδωσες) -----
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
  "Ο προορισμός σου είναι:... \n (Γράψε τον παρακάτω....)",      // <- προτελευταίο
  "ΣΩΣΤΑΑΑΑΑ! ΧΡΟΝΙΑ ΠΟΛΛΑΑΑΑΑ!!!"
];

const backgroundsIstanbul = [
  "url('img/i/1.jpg')", "url('img/i/2.jpg')", "url('img/i/3.jpg')",
  "url('img/i/4.png')", "url('img/i/5.jpg')", "url('img/i/6.webp')",
  "url('img/i/7.png')", "url('img/i/8.jpg')", "url('img/i/9.jpg')",
  "url('img/black.png')",            // <- προτελευταίο: μαύρο
  "url('img/i/10.jpg')"              // <- τελευταίο
];

// Μαρακές
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
  "Ο προορισμός σου είναι:... (Γράψε τον παρακάτω....)",      // <- προτελευταίο
  "ΣΩΣΤΑΑΑΑΑ! ΧΡΟΝΙΑ ΠΟΛΛΑΑΑΑΑ!!!"                         // <- τελευταίο
];

const backgroundsMarrakesh = [
  "url('img/m/1.avif')", "url('img/m/2.jpg')", "url('img/m/3.webp')",
  "url('img/m/4.jpg')", "url('img/m/5.jpg')", "url('img/m/6.png')",
  "url('img/m/7.jpeg')", "url('img/m/8.webp')", "url('img/m/9.jpg')",
  "url('img/black.png')",             // <- προτελευταίο: μαύρο
  "url('img/m/10.jpg')"               // <- τελευταίο
];

// ----- Intro / μουσική -----
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const intro = document.getElementById("introScreen");
  const game = document.getElementById("gameWrapper");
  const music = document.getElementById("bgMusic");

  startBtn.addEventListener("click", () => {
    intro.style.opacity = "0";
    setTimeout(() => {
      intro.style.display = "none";
      game.style.display = "flex";
      music.muted = false;      // unmute με user gesture
      music.play().catch(() => {
      });
    }, 300);
  });
});

// ----- Κατάσταση -----
let stepI = 0;
let stepM = 0;

// DOM refs
const hintI = document.getElementById("hintIstanbul");
const hintM = document.getElementById("hintMarrakesh");
const nextI = document.getElementById("nextIstanbul");
const prevI = document.getElementById("prevIstanbul");
const nextM = document.getElementById("nextMarrakesh");
const prevM = document.getElementById("prevMarrakesh");
const halfI = document.getElementById("istanbul");
const halfM = document.getElementById("marrakesh");
const bgMusic = document.getElementById("bgMusic");

// Keyboard containers
const kbWrapI = document.getElementById("keyboardWrapperIstanbul");
const kbWrapM = document.getElementById("keyboardWrapperMarrakesh");
const wordI = document.getElementById("wordDisplayIstanbul");
const wordM = document.getElementById("wordDisplayMarrakesh");
const kbI = document.getElementById("keyboardIstanbul");
const kbM = document.getElementById("keyboardMarrakesh");
const clearI = document.getElementById("clearIstanbul");
const clearM = document.getElementById("clearMarrakesh");

// Στόχοι & προ-τελευταίοι δείκτες
const TARGET_I = "ΚΩΝΣΤΑΝΤΙΝΟΥΠΟΛΗ";
const TARGET_M = "ΜΑΡΑΚΕΣ";
const PRELAST_I = hintsIstanbul.length - 2;
const PRELAST_M = hintsMarrakesh.length - 2;

// Βοηθητικό: αλλαγή μουσικής μόνο στο ΤΕΛΕΥΤΑΙΟ βήμα (όπως ζήτησες)
function changeMusic(src) {
  if (bgMusic.currentSrc.includes(src)) return;
  bgMusic.src = src;
  bgMusic.play().catch(() => {
  });
}

// Δημιουργία ελληνικού πληκτρολογίου (24 γράμματα)
function makeKeyboard(container, display, clearBtn, onSolved) {
  const letters = "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ".split("");
  let typed = "";

  // Καθαρισμός προηγούμενων (αν υπάρχουν)
  container.innerHTML = "";
  display.textContent = "";

  letters.forEach(ch => {
    const b = document.createElement("button");
    b.className = "letterBtn";
    b.textContent = ch;
    b.addEventListener("click", () => {
      typed += ch;
      display.textContent = typed;
      onSolved(typed, () => {
        typed = "";
        display.textContent = "";
      });
    });
    container.appendChild(b);
  });

  clearBtn.addEventListener("click", () => {
    typed = "";
    display.textContent = "";
  });

  // επιστρέφει reset για όταν μπαίνουμε/βγαίνουμε από το βήμα
  return () => {
    typed = "";
    display.textContent = "";
  };
}

// Φτιάχνουμε και κρατάμε reset fns
const resetKbI = makeKeyboard(kbI, wordI, clearI, (typed) => {
  if (typed === TARGET_I) {
    stepI = hintsIstanbul.length - 1;   // πήδα στο τελευταίο
    updateHintI();
  }
});
const resetKbM = makeKeyboard(kbM, wordM, clearM, (typed) => {
  if (typed === TARGET_M) {
    stepM = hintsMarrakesh.length - 1;  // πήδα στο τελευταίο
    updateHintM();
  }
});

// ----- Update Κωνσταντινούπολη -----
function updateHintI() {
  hintI.style.opacity = 0;
  setTimeout(() => {
    // background
    halfI.style.backgroundImage = backgroundsIstanbul[stepI];

    // κείμενο
    if (stepI === PRELAST_I) {
      hintI.innerHTML = "Ο προορισμός σου είναι:... <br> (Γράψε τον παρακάτω)";
    } else {
      hintI.textContent = hintsIstanbul[stepI];
    }

    hintI.style.opacity = 1;

    // κουμπιά
    prevI.style.display = stepI === 0 ? "none" : "inline-block";
    nextI.style.display = (stepI === hintsIstanbul.length - 1 || stepI === PRELAST_I)
      ? "none"
      : "inline-block";

    // keyboard show/hide
    if (stepI === PRELAST_I) {
      kbWrapI.style.display = "block";
      resetKbI();
    } else {
      kbWrapI.style.display = "none";
    }

    // μουσική στο ΤΕΛΕΥΤΑΙΟ βήμα
    if (stepI === hintsIstanbul.length - 1) {
      changeMusic("audio/ist.mp3");
    }
  }, 200);
}

function nextHintI() {
  if (stepI < hintsIstanbul.length - 1) {
    stepI++;
    updateHintI();
  }
}

function prevHintI() {
  if (stepI > 0) {
    stepI--;
    updateHintI();
  }
}

// ----- Update Μαρακές -----
function updateHintM() {
  hintM.style.opacity = 0;
  setTimeout(() => {
    halfM.style.backgroundImage = backgroundsMarrakesh[stepM];

    if (stepM === PRELAST_M) {
      hintM.innerHTML = "Ο προορισμός σου είναι:... <br> (Γράψε τον παρακάτω)";
    } else {
      hintM.textContent = hintsMarrakesh[stepM];
    }

    hintM.style.opacity = 1;

    prevM.style.display = stepM === 0 ? "none" : "inline-block";
    nextM.style.display = (stepM === hintsMarrakesh.length - 1 || stepM === PRELAST_M)
      ? "none"
      : "inline-block";

    if (stepM === PRELAST_M) {
      kbWrapM.style.display = "block";
      resetKbM();
    } else {
      kbWrapM.style.display = "none";
    }

    if (stepM === hintsMarrakesh.length - 1) {
      changeMusic("audio/marak.mp3");
    }
  }, 200);
}

function nextHintM() {
  if (stepM < hintsMarrakesh.length - 1) {
    stepM++;
    updateHintM();
  }
}

function prevHintM() {
  if (stepM > 0) {
    stepM--;
    updateHintM();
  }
}

// Listeners
nextI.addEventListener("click", nextHintI);
prevI.addEventListener("click", prevHintI);
nextM.addEventListener("click", nextHintM);
prevM.addEventListener("click", prevHintM);

// Αρχικοποίηση
updateHintI();
updateHintM();
