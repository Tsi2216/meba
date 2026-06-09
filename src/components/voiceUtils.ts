export function speakWithFemaleVoice(
  text: string,
  options: { rate?: number; pitch?: number; volume?: number } = {},
  callbacks: { onstart?: () => void; onend?: () => void } = {}
) {
  if (!("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;

  // 🔥 HARD RESET (fix silent stuck state)
  synth.cancel();
  synth.resume();

  const utter = new SpeechSynthesisUtterance(text);

  utter.rate = options.rate ?? 0.9;
  utter.pitch = options.pitch ?? 1.05;
  utter.volume = options.volume ?? 1;

  if (callbacks.onstart) utter.onstart = callbacks.onstart;
  if (callbacks.onend) utter.onend = callbacks.onend;

  const speakNow = () => {
    const voices = synth.getVoices();

    // log for debugging (IMPORTANT)
    console.log("Available voices:", voices);

    if (voices.length > 0) {
      utter.voice =
        voices.find(v =>
          /en|google|microsoft|samantha|aria|jenny/i.test(v.name)
        ) || voices[0];
    }

    synth.speak(utter);
  };

  // 🔥 FORCE USER INTERACTION COMPATIBILITY
  const voices = synth.getVoices();

  if (voices.length === 0) {
    let fired = false;

    const wait = () => {
      if (fired) return;
      fired = true;
      speakNow();
    };

    synth.addEventListener("voiceschanged", wait, { once: true });

    // HARD fallback
    setTimeout(wait, 800);
  } else {
    speakNow();
  }
}