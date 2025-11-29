// src/utils/confetti.ts
import confetti from "canvas-confetti";

export const triggerTechConfetti = () => {
  const end = Date.now() + 3 * 1000; // 3 seconds duration
  const colors = ["#A9EF2E", "#ffffff"]; // Your Primary Green and White

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 }, // Bottom Left
      colors: colors,
      shapes: ["square"], // Square matches your UI sharp edges
      scalar: 0.8, // Slightly smaller "pixels"
      drift: 0,
      gravity: 1.2, // Fall faster for a "heavy" tech feel
      ticks: 300,
      disableForReducedMotion: true,
      zIndex: 100, // Make sure it sits on top
    });
    
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 }, // Bottom Right
      colors: colors,
      shapes: ["square"],
      scalar: 0.8,
      drift: 0,
      gravity: 1.2,
      ticks: 300,
      disableForReducedMotion: true,
      zIndex: 100,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};