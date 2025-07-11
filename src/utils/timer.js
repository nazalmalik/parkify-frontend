const startCountdown = (seconds, onTick, onComplete) => {
  let remaining = seconds;
  const interval = setInterval(() => {
    remaining--;
    onTick(remaining);
    if (remaining <= 0) {
      clearInterval(interval);
      onComplete();
    }
  }, 1000);
  return () => clearInterval(interval); // return a function to cancel the timer
};

export default startCountdown;
