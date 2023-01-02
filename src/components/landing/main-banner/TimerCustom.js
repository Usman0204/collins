import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp, timerStatuss }) {
  useEffect(() => {
    start();
    const time = new Date();
    time.setSeconds(expiryTimestamp);
    restart(time)
  }, [expiryTimestamp])
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () =>{
    timerStatuss(Math.random()); 
} });
  // useEffect(() => {
  //   if (seconds === 0) { timerStatuss('timeEnds') }
  // }, [seconds === 0])
  
  return (
    <div style={{ textAlign: 'center' }}>
      <div className='timerDivvv' style={{ fontSize: '1.4rem' }}>
        <span>{days} Days</span> : <span>{hours} Hours </span> : <span>{minutes} Minutes </span> : <span>{seconds} Seconds</span>
      </div>
      {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
      {/* <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>*/}
      {/* <button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds( expiryTimestamp);
        restart(time)
      }}>Restart</button>  */}
    </div>
  );
}

export default function App({ timeLeft, timerStatus }) {
  // alert(timeLeft)
  const time = new Date();
  time.setSeconds(timeLeft); // 10 minutes timer
  // time.setSeconds(time.getSeconds() + 10); 
  return (
    <div>
      <MyTimer expiryTimestamp={timeLeft} timerStatuss={timerStatus} />
    </div>
  );
}