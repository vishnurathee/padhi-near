import { useEffect, useRef, useState } from "react";

const realPandaLines = [
  "Oye! Mujhe guda-gudi mat karo!",
  "Boom! Aage badho bhai!",
  "Aap bohot aache ho!",
  "Let's Go! Ruko mat!",
  "Panda Power!",
];

export function PandaPet() {
  const [line, setLine] = useState("Chalo Sath Chalein!");
  const [hot, setHot] = useState(false);
  const [walking, setWalking] = useState(false);
  const [jump, setJump] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollTimer = useRef(0);

  function playPandaSound() {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
    setLine(realPandaLines[Math.floor(Math.random() * realPandaLines.length)]);
    setHot(true);
    setJump(true);
    window.setTimeout(() => {
      setJump(false);
      setHot(false);
    }, 400);
  }

  useEffect(() => {
    function onScroll() {
      setWalking(true);
      setLine("Main aapke sath chal raha hoon!");
      window.clearTimeout(scrollTimer.current);
      scrollTimer.current = window.setTimeout(() => {
        setWalking(false);
        setLine("Chalo Sath Chalein!");
      }, 500);
    }
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    return () => {
      document.removeEventListener("scroll", onScroll, true);
      window.clearTimeout(scrollTimer.current);
    };
  }, []);

  return (
    <div className="game-pet-companion" id="pandaPet" onClick={playPandaSound}>
      <div
        className={"panda-3d-character" + (walking ? " walking" : "") + (jump ? " is-jump" : "")}
        id="pandaVisual"
      />
      <div className={"panda-chat-bubble" + (hot ? " is-hot" : "")} id="pandaTalk">
        {line}
      </div>
      <audio id="pandaAudio" ref={audioRef} src="/panda/tap.wav" preload="auto" />
    </div>
  );
}
