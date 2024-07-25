import React, { useEffect, useRef } from 'react';
import classes from "./Cell.module.css";

function PreparationCell(props) {
  const preparationCellRef = useRef(null);

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
    props.setDragging(source);
  };

  const onDragEnd = (event) => {
    props.setDragging(null);
  };

  const onDragOver = (event, destination) => {
    event.preventDefault();
    if (props.dragging === destination) {
      event.dataTransfer.dropEffect = 'move';
    } else {
      event.dataTransfer.dropEffect = 'none';
    }
  };

  const onDrop = (event, dropIndex, destination) => {
    event.preventDefault();
    event.target.classList.remove(classes['valid-drop'], classes['invalid-drop']);
    props.setDragging(null);
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
    if (props.dragging === destination) {
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
    props.setShowDescription(true);
    props.setDescription(props.value);
    props.setAdditionalDescription('');
  }

  function hideDescription() {
    props.setShowDescription(false);
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
          className={`${classes.cell} ${classes['cell-back']} ${props.showCards ? classes['cell-back-reverse'] : null}`}
        >{props.value}</div>
        <div
          className={`${classes.cell} ${classes['cell-front']} ${props.showCards ? classes['cell-front-reverse'] : null}`}
          onMouseEnter={showDescription}
          onMouseLeave={hideDescription}
        >
          {props.value}
        </div>
      </div>
  );
}

export default PreparationCell;