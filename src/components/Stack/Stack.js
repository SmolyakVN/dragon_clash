import React, { useState, useEffect } from 'react';
import CardInStack from "./CardInStack.js";
import classes from "../Frames/Sideframe.module.css";

function Stack(props) {
    const [count, setCount] = useState(0);

    const renderWithCounter = (filterFn, cells) => {
        return cells.map((item, i) => 
            filterFn(item) ? (
            <CardInStack
                key={i}
                type={item.type}
                value={item.value}
                count={count}
            ></CardInStack>
            ) : null
        );
    }

    let cells = props.type === 'wins' ? props.cells[1] : props.cells[0];
    
    useEffect(() => {
        const newCount = cells.filter(item => item.player === props.playerNum && item.win === (props.type === 'wins' ? true : false)).length;
        setCount(newCount);
    }, [cells, props.playerNum, props.type]);

    return (
        <div className={`${classes['sideframe-cards-container']} ${classes[props.type]}`}>
            <div className={`${classes['cards-stack']}`}>
                {renderWithCounter(item => item.player === props.playerNum && item.win === (props.type === 'wins' ? true : false), cells)}
            </div>
            <div className={classes['cards-stack-label']}>{props.type === 'wins' ? 'победы' : 'потери'}</div>
        </div>
    );
}

export default Stack;