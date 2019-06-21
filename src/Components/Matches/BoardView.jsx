import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BoardViewMatchCard from './BoardViewMatchCard.jsx';

class BoardView extends Component {
  render() {
    let matchList = this.props.matchDataList;
    console.log(matchList);

    let eighthFinalList = [];
    let quaterFinalList = [];
    let semiFinalList = [];
    let final = {};
    eighthFinalList = matchList.filter((match)=>{
      if (match.stage_name === "Round of 16") {
        return match;
      }
    });

    quaterFinalList = matchList.filter((match)=>{
      if (match.stage_name === "Quarter-final") {
        return match;
      }
    })

    semiFinalList = matchList.filter((match)=>{
      if (match.stage_name === "Semi-final") {
        return match;
      }
    })

    let finalTmp = matchList.filter((match)=>{
      if (match.stage_name === "Final") {
        return match;
      }
    })

    final = finalTmp[0];
    return (
          <div className="board-view">
            <div className="table">
              <BoardViewMatchCard
                match={eighthFinalList[1]}
              />
              <BoardViewMatchCard
                match={eighthFinalList[2]}
              />
              <BoardViewMatchCard
                match={eighthFinalList[3]}
              />
              <BoardViewMatchCard
                match={eighthFinalList[4]}
              />
              <BoardViewMatchCard
                match={eighthFinalList[5]}
              />
              <BoardViewMatchCard
                match={eighthFinalList[0]}
              />
              <BoardViewMatchCard
                match={eighthFinalList[7]}
              />
              <BoardViewMatchCard
                match={eighthFinalList[6]}
              />
              <BoardViewMatchCard
                match={quaterFinalList[0]}
              />
              <BoardViewMatchCard
                match={quaterFinalList[1]}
              />
              <BoardViewMatchCard
                match={quaterFinalList[2]}
              />
              <BoardViewMatchCard
                match={quaterFinalList[3]}
              />
              <BoardViewMatchCard
                match={semiFinalList[0]}
              />
              <BoardViewMatchCard
                match={semiFinalList[1]}
              />
              <BoardViewMatchCard
                match={final}
                class="final-card"
              />
              <div className='horizontal-line'/>
              <div className='horizontal-line'/>
              <div className='horizontal-line'/>
              <div className='horizontal-line'/>
              <div className='horizontal-line'/>
              <div className='horizontal-line'/>
              <div className='horizontal-line'/>
              <div className='horizontal-line'/>
              <div className='horizontal-line'/>
              <div className='horizontal-line'/>
              <div className='horizontal-line'/>
              <div className='horizontal-line'/>
              <div className='horizontal-line'/>
              <div className='vertical-line'/>
              <div className='vertical-line'/>
              <div className='vertical-line'/>
              <div className='vertical-line'/>
              <div className='vertical-line'/>
              <div className='vertical-line'/>
              <div className='vertical-line'/>
            </div>
          </div>
    )
  }
}

export default BoardView;
