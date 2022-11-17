import React, {useContext, useState} from 'react'
import { observer } from "mobx-react-lite"
import { GameStateContext } from '../App';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Button } from '@mui/material';
import { Team } from '../state/Player';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

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
                            {i < props.timeouts && <CircleIcon fontSize='small'></CircleIcon>}
                            {i >= props.timeouts && <CircleOutlinedIcon fontSize='small'></CircleOutlinedIcon>}
                        </>
                    )
                })}
            </div>             
            <Button variant="outlined" size="small" onClick={props.timeoutFunction}>Timeout</Button>
            
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
                    <div className="scoreboard__scores">
                        <div className='score width3'>{gameState.awayRoster.pointsScored}</div>
                        {/* // potential pos arrow */}
                        <div className='score__center width3'>
                            <div className="width3 leftarrow">
                                {gameState.possessionArrow === Team.home ? 
                                    <ArrowBackIosNewOutlinedIcon fontSize='small'/> : <div/> }
                            </div>
                            <div className="width3 quarter">
                                Q{gameState.quarter}
                            </div>
                            <div className="width3 rightarrow">
                            {gameState.possessionArrow === Team.away ? 
                                    <ArrowForwardIosOutlinedIcon fontSize='small'/> : <div/> }
                            </div>
                        </div>
                        {/* // potential pos arrow */}
                        <div className='score width3'>{10}</div>
                    </div>
                    <Button variant='outlined' size='small' onClick={() => {gameState.increaseQuarter()}}>Increase</Button>
                </div>
                <TeamDescriptionComponent name='Home' timeouts={gameState.homeTimeouts} maxTimeouts={4} timeoutFunction={() => {gameState.callTimeout(Team.home)}}/>
            </div>
        </div>
    )
}

export default observer(ScoreBoard)