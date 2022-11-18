import React, {useContext, useState} from 'react'
import { observer } from "mobx-react-lite"
import { GameStateContext } from '../App';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Button } from '@mui/material';
import { Team } from '../state/Player';

import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';


import "../css/ScoreBoard.css";

interface TeamDescriptionProps {
    name: string,
    timeouts: number,
    maxTimeouts: number,
    timeoutFunction: () => any,
}

const TeamDescriptionComponent: React.FC<TeamDescriptionProps> = observer((props) => {
    return (
        <div className='teamdescription'>
            <div className='teamname'>{props.name}</div>  
            <div className='timeouts'>
                {[...Array(props.maxTimeouts)].map((e, i) => {
                    return (
                        <>
                            {i < props.timeouts && <CircleIcon fontSize='inherit'></CircleIcon>}
                            {i >= props.timeouts && <CircleOutlinedIcon fontSize='inherit'></CircleOutlinedIcon>}
                        </>
                    )
                })}
            </div>             
            {/* <Button variant="outlined" size="small" onClick={props.timeoutFunction}>Timeout</Button> */}
            
        </div>
    )
})

function ScoreBoard() {

    const gameState = useContext(GameStateContext);
    
    return (
        <div className='scoreboard'>
            <div className="scoreboarddata">
                <TeamDescriptionComponent name='Away' timeouts={gameState.awayTimeouts} maxTimeouts={4} timeoutFunction={() => {gameState.callTimeout(Team.away)}}/>
                <div className="centerscoreboard">
                    <div className="score">
                        {gameState.awayRoster.pointsScored}
                    </div>
                    <div className="quarter">
                        <KeyboardDoubleArrowLeftOutlinedIcon className='posarrow__icon' fontSize="large" color={gameState.possessionArrow === Team.away ? "primary" : "disabled"} onClick={() => {gameState.possessionArrow = Team.away}}/>
                        <div>
                            Q{gameState.quarter}
                        </div>
                        <KeyboardDoubleArrowRightOutlinedIcon className='posarrow__icon' fontSize="large" color={gameState.possessionArrow === Team.home ? "primary" : "disabled"} onClick={() => {gameState.possessionArrow = Team.home}}/>
                    </div>
                    <div className="score">
                        {gameState.homeRoster.pointsScored}
                    </div>
                </div>
                <TeamDescriptionComponent name='Home' timeouts={gameState.homeTimeouts} maxTimeouts={4} timeoutFunction={() => {gameState.callTimeout(Team.home)}}/>
            </div>
        </div>
    )
}

export default observer(ScoreBoard)