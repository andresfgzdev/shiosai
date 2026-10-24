type Frame = { y: number; vh: number };
type Subscriber = (frame: Frame) => void;

const subscribers = new Set<Subscriber>();
let frame = 0;

function run() {
  frame = 0;
  const state = { y: window.scrollY, vh: window.innerHeight || 900 };
  for (const subscriber of subscribers) subscriber(state);
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(run);
}

export function subscribeScroll(subscriber: Subscriber) {
  if (subscribers.size === 0) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
  }
  subscribers.add(subscriber);
  schedule();
  return () => {
    subscribers.delete(subscriber);
    if (subscribers.size > 0) return;
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };
}
