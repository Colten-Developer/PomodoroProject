import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import {minutesToDuration, secondsToDuration} from "../utils/duration"
import FocusDuration from './FocusDuration'
import BreakDuration from './BreakDuration'
import DisplayTime from './DisplayTime'
import TimerControls from './TimerControls'

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5)
  const [activeTime, setActiveTime] = useState(focusTime*60)
  const [completedPercentage, setCompletedPercentage] = useState(0)
  const [formatedPercentage, setFormatedPercentage] = useState('0')
  const [focusOrBreak, setFocusOrBreak] = useState(true);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(true);
  const [timeRan, setTimeRan] = useState(false);
  
  
  const decreaseFocusTime = () => {
		if(focusTime <= 5){
		}else{
			setFocusTime((currentTime) => currentTime -5)
			setActiveTime((currentTime) => currentTime- (5*60) )
			return focusTime
		}
  }
  
  const increaseFocusTime =() => {
	  if(focusTime >= 60){
	  }else{
			setFocusTime((currentTime) => currentTime +5)
			setActiveTime((currentTime) => currentTime+ (5*60) )
			return focusTime
		}
  }
  
  const adjustActiveTime = (breakOrFocus) => {
	  setActiveTime((currentTime) => currentTime = breakOrFocus *60)
  }
  
  const decreaseBreakTime = () => {
	  if(breakTime <= 1){
	  }else{
			setBreakTime((currentTime) => currentTime -1)
			return breakTime
		}
  }
  
  const increaseBreakTime = () => {
	  if(breakTime >= 15){
	  }else{
			setBreakTime((currentTime) => currentTime +1)
			return breakTime
		}
  }
  
  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
	  if(isTimerRunning){
		  //decrease active counter by 1sec per sec
		  setActiveTime((currentTime) => currentTime-1)
		  if(activeTime <=0){
			  if(focusOrBreak){
				new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
				adjustActiveTime(breakTime)
				setFocusOrBreak(!focusOrBreak)
			  }else{
				  new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
				  adjustActiveTime(focusTime)
				  setFocusOrBreak(!focusOrBreak)
			  }
		  }
		  
		  setCompletedPercentage((currentPercentage) => {
				//find what percentage we are completed by
				currentPercentage = ((1-(activeTime/ ((focusOrBreak ? focusTime : breakTime)*60))) *100).toFixed(2)
				//format completed percentage
				setFormatedPercentage(currentPercentage)
			});
	  }
    },
    isTimerRunning ? 1000 : null
  );


  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
	setPaused((prevState) => !prevState);
	setStopped((prevState) => prevState = false);
	setTimeRan((prevState) => prevState = true);
  }
  
  function stop() {
	  adjustActiveTime(focusTime);
	  playPause();
	  setStopped((prevState) => prevState = true);
	  setTimeRan((prevState) => prevState = false);
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <FocusDuration focusTime={focusTime} decreaseFocusTime={decreaseFocusTime} timeRan={timeRan} increaseFocusTime={increaseFocusTime} />
        </div>
        <div className="col">
          <BreakDuration decreaseBreakTime={decreaseBreakTime} breakTime={breakTime} timeRan={timeRan} increaseBreakTime={increaseBreakTime}/>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TimerControls playPause={playPause} isTimerRunning={isTimerRunning} stop={stop} />
        </div>
      </div>
<DisplayTime focusOrBreak={focusOrBreak} breakTime={breakTime} focusTime={focusTime} timeRan={timeRan} stopped={stopped} paused={paused} formatedPercentage={formatedPercentage} activeTime={activeTime} />
    </div>
  );
}

export default Pomodoro;