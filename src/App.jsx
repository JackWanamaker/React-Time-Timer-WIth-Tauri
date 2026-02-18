import { useState, useEffect, useRef } from 'react'
import './App.css'
import Arc from './Arc'
import TimerInput2 from './TimerInput'
import StartPause from './StartPause'
import ResetStop from './ResetStop'

function App() {
  const [arcAngle, setArcAngle] = useState(359.99);
  const [timerLength, setTimerLength] = useState(3600);
  const refreshTime = 5;
  const [secondsCounter, setSecondsCounter] = useState(0);
  const [start, setStart] = useState(true);

  const tempTimeStamp = useRef(Date.now());

  const [cachedTime, setCachedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isReset, setIsReset] = useState(true);

  const [timerValue, setTimerValue] = useState(["00", "01", "00"]);
  const timerRef0 = useRef(null);
  const timerRef1 = useRef(null);
  const timerRef2 = useRef(null);
  const timerRefs = [timerRef0, timerRef1, timerRef2];
  const [initialTimerValue, setInitialTimerValue] = useState(["00", "00", "00"]);
  const [initialTimerLength, setInitialTimerLength] = useState(0);
  const [caret, setCaret] = useState([0, 1]);
  
  function convertHMSToMiliseconds(timerValue) {
    return ((parseInt(timerValue[0])*3600) + (parseInt(timerValue[1])*60) + (parseInt(timerValue[2])))*1000;
  }

  function milisecondsToHMS(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ];
  }
  
  function startTimer() {
    tempTimeStamp.current = Date.now();
    setInitialTimerValue(timerValue);
    setInitialTimerLength(convertHMSToMiliseconds(timerValue));
    setTimerLength(convertHMSToMiliseconds(timerValue));
    setIsRunning(true);
    setIsReset(false);
    setStart(false);
    console.log("Started");
  }

  function resetTimer() {
    setTimerValue(initialTimerValue);
    setTimerLength(convertHMSToMiliseconds(initialTimerValue));
    setCachedTime(0);
    setArcAngle(359.99);
    setIsReset(true);
    setStart(true);
  }

  function resumeTimer() {
    tempTimeStamp.current = Date.now();
    setIsRunning(true);
    console.log("Resumed");
  }

  function pauseTimer() {
    setIsRunning(false);
    console.log("Paused");
  }

  function stopTimer() {
    setIsRunning(false);
    setTimerValue(initialTimerValue);
    setTimerLength(convertHMSToMiliseconds(initialTimerValue));
    setArcAngle(359.99);
    console.log("Stopped");
    setIsReset(true);
    setStart(true);
  }

  function handleStartPause() {
    if (!isRunning) {
      if (start) {
        startTimer();
      }
      else {
        resumeTimer();
      }
    }
    else {
      pauseTimer();
    }
  }

  function handleResetStop() {
    if (isRunning) {
      stopTimer();
    }
    else {
      resetTimer();
    }
  }

  useEffect(() => {
    if (isRunning) {
      if (timerLength <= 0) {
        console.log("Timer Finished");
        stopTimer();
        return; // stop when 0
      }
      
      const timer = setInterval(() => {
      const currentTime = Date.now();
      console.log("Current Time: " + currentTime);
      console.log("Temp Time Stamp: " + tempTimeStamp.current);
      const elapsedTime = currentTime - tempTimeStamp.current;
      console.log("Elapsed Time: " + elapsedTime);
      setTimerLength(timerLength - elapsedTime);
      console.log("Timer Length: " + timerLength);
      if (timerLength == initialTimerLength) {
        setArcAngle(359.99);
      } else {
        setArcAngle((timerLength/(initialTimerLength))*360);
      }
      tempTimeStamp.current = currentTime;
      console.log("I ran");
      if (secondsCounter + elapsedTime >= 1000) {
        setTimerValue(milisecondsToHMS(timerLength));
        setSecondsCounter(secondsCounter + elapsedTime - 1000);
      } else {
        setSecondsCounter(secondsCounter + elapsedTime);
      }
    }, refreshTime);
    return () => clearInterval(timer); // cleanup when unmounted
      
    }

  }, [isRunning, timerLength]);

  useEffect(() => {
    if (!isRunning) {   
        console.log("Current Box: " + caret[0]);
        console.log("Current Caret: " + caret[1]);
        console.log(timerValue);
        timerRefs[caret[0]].current.focus();
        timerRefs[caret[0]].current.selectionStart = caret[1];
        setTimerLength(convertHMSToMiliseconds(timerValue));
    }
    }, [timerValue]);

  return (
    <>
      <Arc radius={80} startAngle={0} endAngle={arcAngle} stroke="black" strokeWidth={1.5} />
      <br></br>
      <StartPause isRunning={isRunning} handleStartPause={handleStartPause}/>
      <ResetStop isRunning={isRunning} handleResetStop={handleResetStop}/>
      <br></br>
      <br></br>
      <TimerInput2 refs={timerRefs} ref0={timerRef0} ref1={timerRef1} ref2={timerRef2} timerValue={timerValue} setTimerValue={setTimerValue} caret={caret} setCaret={setCaret} isReset={isReset}/>
    </>
  )
}

export default App
