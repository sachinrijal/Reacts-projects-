import React, { useState } from "react";
import Box from "./Box";

function Board() {

    const [state ,setState] = useState(Array(9).fill(null))
    const [isXturn , setisXTurn] = useState(false)

    function handleWinner(){
        const winnerCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [2,4,6],
            [0,4,8],
        ]

        
        for (let value of winnerCombinations){
            let [a,b,c] = value;
            console.log(a, b, c);
            console.log(state[a], state[b], state[c]);
            if (state[a] !== null){
                if (state[a] === state[b] && state[b] === state[c]){
                    return state[a];
                }
            }
        }

        return false;
    }
    
    const iswinner = handleWinner()
    console.log(iswinner)

    function handleClick(index){
        if (iswinner || state[index]) return ;

        let new_arr = [...state];
        new_arr[index] = isXturn ? "X" : "O";
        setState(new_arr);
        
        setisXTurn(!isXturn)
    }

    function handlePopUP(){
        setState([]);
    }


    return (
        <>      
        <div className="container">
            
            <div className="board-row">
                <Box onclick={() => handleClick(0)} value={state[0]} />
                <Box onclick={() => handleClick(1)} value={state[1]} />
                <Box onclick={() => handleClick(2)} value={state[2]} />
            </div>

            <div className="board-row">
                <Box onclick={() => handleClick(3)} value={state[3]} />
                <Box onclick={() => handleClick(4)} value={state[4]} />
                <Box onclick={() => handleClick(5)} value={state[5]} />
            </div>

            <div className="board-row">
                <Box onclick={() => handleClick(6)} value={state[6]} />
                <Box onclick={() => handleClick(7)} value={state[7]} />
                <Box onclick={() => handleClick(8)} value={state[8]} />
            </div>

        </div>

        {iswinner && (
        <div className="popup-overlay">
            <div className="popup">
            <h2>{iswinner} Wins 🎉</h2>
            <button onClick={handlePopUP}>Play Again</button>
            </div>
        </div>
        )}

        </>
    )
}

export default Board
