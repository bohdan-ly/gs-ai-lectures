import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete,
}) => {
  const containerRef = useRef(null);

  // Build start string for ScrollTrigger
  const buildStart = () => {
    const startPct = (1 - threshold) * 100;
    const match = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    if (!match) return `top ${startPct}%`;
    const val = parseFloat(match[1]);
    const unit = match[2] || 'px';
    if (val === 0) return `top ${startPct}%`;
    const offset = val < 0 ? `-=${Math.abs(val)}${unit}` : `+=${val}${unit}`;
    return `top ${startPct}%${offset}`;
  };

  // Split text into units (chars or words)
  const renderContent = () => {
    if (splitType === 'words') {
      return text.split(' ').map((word, i, arr) => (
        <span key={i} style={{ display: 'inline-block' }}>
          {word}
          {i < arr.length - 1 ? '\u00A0' : ''}
        </span>
      ));
    }
    // default: chars
    return text.split('').map((char, i) => (
      <span key={i} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
        {char}
      </span>
    ));
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const spans = containerRef.current.querySelectorAll('span');
      if (!spans.length) return;

      gsap.fromTo(
        spans,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: containerRef.current,
            start: buildStart(),
            once: true,
            fastScrollEnd: true,
          },
          onComplete: () => {
            onLetterAnimationComplete?.();
          },
          force3D: true,
        },
      );
    },
    { scope: containerRef, dependencies: [text, delay, duration, ease, splitType] },
  );

  const Tag = tag;

  return (
    <Tag
      ref={containerRef}
      className={className}
      style={{ textAlign, display: 'block', overflow: 'hidden' }}
    >
      {renderContent()}
    </Tag>
  );
};

export default SplitText;
