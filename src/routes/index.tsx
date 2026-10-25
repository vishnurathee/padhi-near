import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Wires } from "@/components/wires";

const posters = [
  { src: "/banners/banner-7.jpg", href: "/c/10", label: "Start earning points" },
  { src: "/banners/banner-1.jpg", href: "/c/10", label: "Check your basics" },
  { src: "/banners/banner-2.jpg", href: "/solve", label: "Start practising" },
  { src: "/banners/banner-3.jpg", href: "/toppers", label: "Explore mentorship" },
  { src: "/banners/banner-4.jpg", href: "/evaluate", label: "Improve your answers" },
  { src: "/banners/banner-5.jpg", href: "/papers", label: "Explore sample papers" },
  { src: "/banners/banner-6.jpg", href: "/c/10", label: "Explore the plan" },
];

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % posters.length);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="front">
      <Wires />
      <div className="front-shapes" aria-hidden="true">
        <span className="tri tri-a" />
        <span className="tri tri-b" />
        <span className="tri tri-c" />
        <span className="tri tri-d" />
        <span className="tri tri-e" />
      </div>
      <header className="front-bar">
        <Link to="/" className="front-logo">
          Padhaai <span>Neev</span>
        </Link>
      </header>
      <main className="front-main">
        <div className="poster-reel" aria-label="Padhaai Neev posters">
          {posters.map((poster, index) => (
            <a key={poster.src} href={poster.href} className={index === slide ? "is-on" : ""} aria-label={poster.label}>
              <img src={poster.src} alt={poster.label} />
            </a>
          ))}
        </div>
        <div className="poster-dots">
          {posters.map((poster, index) => (
            <button key={poster.src} type="button" className={index === slide ? "is-on" : ""} aria-label={poster.label} onClick={() => setSlide(index)} />
          ))}
        </div>
        <div className="front-hero">
          <h1>
            India's Most Trusted <span>Board Examination</span> Workspace
          </h1>
          <p>Welcome to Padhaai Neev VIP Hub. Select your current academic class below to open the resources.</p>
        </div>
        <div className="banner-row">
          <Link to="/c/$classId" params={{ classId: "10" }} search={{ tab: "home" }} className="banner-card class-10">
            <span className="banner-overlay" />
            <span className="banner-content">
              <span className="badge badge-orange">CBSE / STATE BOARDS</span>
              <span className="banner-title">CLASS 10</span>
              <span className="banner-copy">High school fundamentals, interactive sample papers and complete board preparation blueprints.</span>
              <span className="select-btn">Explore Neev</span>
            </span>
            <span className="geometric-shapes" aria-hidden="true">
              <span className="shape circle" />
              <span className="shape triangle" />
            </span>
          </Link>
          <Link to="/c/$classId" params={{ classId: "12" }} search={{ tab: "home" }} className="banner-card class-12">
            <span className="banner-overlay" />
            <span className="banner-content">
              <span className="badge badge-cyan">HIGHER SECONDARY</span>
              <span className="banner-title">CLASS 12</span>
              <span className="banner-copy">Advanced engineering, medical, commerce blueprints and high-yield standard mock sets.</span>
              <span className="select-btn">Explore Neev</span>
            </span>
            <span className="geometric-shapes" aria-hidden="true">
              <span className="shape wave" />
              <span className="shape grid-pattern" />
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}
