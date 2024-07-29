import React, { useEffect, useRef } from 'react';
import classes from "./Cell.module.css";
import { useAppContext } from '../../AppProvider';

function PreparationCell(props) {
  const preparationCellRef = useRef(null);
  const {
    dragging, setDragging,
    setShowDescription,
    setDescription, 
    setAdditionalDescription,
    showCards
  } = useAppContext();

  useEffect(() => {
    const updateWidth = () => {
      if (preparationCellRef.current) {
        document.documentElement.style.setProperty('--card-width', `${preparationCellRef.current.offsetWidth}px`);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const onDragStart = (event, itemIndex, source) => {
    event.dataTransfer.setData("item", JSON.stringify({ itemIndex, source }));
    setDragging(source);
  };

  const onDragEnd = (event) => {
    setDragging(null);
  };

  const onDragOver = (event, destination) => {
    event.preventDefault();
    if (dragging === destination) {
      event.dataTransfer.dropEffect = 'move';
    } else {
      event.dataTransfer.dropEffect = 'none';
    }
  };

  const onDrop = (event, dropIndex, destination) => {
    event.preventDefault();
    event.target.classList.remove(classes['valid-drop'], classes['invalid-drop']);
    setDragging(null);
    const data = JSON.parse(event.dataTransfer.getData("item"));
    if (data.source === destination){
      const dragIndex = data.itemIndex;
      const draggedItem = props.cells[dragIndex];
      let newItems = [...props.cells];
      newItems.splice(dragIndex, 1);
      newItems.splice(dropIndex, 0, draggedItem);
      props.setCells(newItems);
    }
  };

  const onDragEnter = (event, destination) => {
    if (dragging === destination) {
      event.target.classList.add(classes['valid-drop']);
    } else {
      event.target.classList.add(classes['invalid-drop']);
    }
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    event.target.classList.remove(classes['valid-drop'], classes['invalid-drop']);
  };

  function showDescription() {
    setShowDescription(true);
    setDescription(props.value);
    setAdditionalDescription('');
  }

  function hideDescription() {
    setShowDescription(false);
  }

  return (
      <div
        className={`${classes['cell-div']}`}
        ref={preparationCellRef}
        data-type={props.type}
        data-value={props.value}
        draggable
        onDragStart={(event) => onDragStart(event, props.id, props.type)}
        onDragEnd={(event) => onDragEnd(event, props.id, props.type)}
        onDragOver={(event) => onDragOver(event, props.type)}
        onDrop={(event) => onDrop(event, props.id, props.type)}
        onDragEnter={(event) => onDragEnter(event, props.type)}
        onDragLeave={onDragLeave}
      >
        <div
          className={`${classes.cell} ${classes['cell-back']} ${showCards ? classes['cell-back-reverse'] : null}`}
        >{props.value}</div>
        <div
          className={`${classes.cell} ${classes['cell-front']} ${showCards ? classes['cell-front-reverse'] : null}`}
          onMouseEnter={showDescription}
          onMouseLeave={hideDescription}
        >
          {props.value}
        </div>
      </div>
  );
}

export default PreparationCell;