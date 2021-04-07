import React from 'react'
import {minutesToDuration, secondsToDuration} from "../utils/duration"

function DisplayTime( {focusOrBreak, breakTime, focusTime, activeTime, stopped, paused, formatedPercentage} ) {
	
	return (
		<div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2" style={stopped ? {opacity: 0} : {opacity: 100}}>
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
<h2 data-testid="session-title">{focusOrBreak ? 'Focusing' : 'On Break'} for {focusOrBreak ? minutesToDuration(focusTime) : minutesToDuration(breakTime)} minutes</h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
			{secondsToDuration(activeTime)} remaining
            </p>
			<h3 style={paused ? {opacity: 0} : {opacity: 100}}>Paused</h3>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col" style={stopped ? {opacity: 0} : {opacity: 100}}>
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={`${formatedPercentage}` }// TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${formatedPercentage}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
	)
}

export default DisplayTime