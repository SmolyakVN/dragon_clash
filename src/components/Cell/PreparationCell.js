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
    showCards,
    setShowModal,
    modalValue, setModalValue
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
    event.currentTarget.querySelector(`.${classes['cell-front']}`).classList.remove(classes['valid-drop']);
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
    event.currentTarget.querySelector(`.${classes['cell-front']}`).classList.remove(classes['valid-drop']);
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
    document.querySelectorAll(`.${classes['cell-front']}`).forEach(cell => {
      cell.classList.remove(classes['valid-drop']);
    });
    event.currentTarget.querySelector(`.${classes['cell-front']}`).classList.add(classes['valid-drop']);
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    if (event.relatedTarget && (event.currentTarget.getAttribute('data-value') === event.relatedTarget.getAttribute('data-value'))){
      return;
    } else {
      event.target.classList.remove(classes['valid-drop']);
    }
  };

  function showDescription() {
    setShowDescription(true);
    setDescription(props.name);
    setAdditionalDescription('');
  }

  function hideDescription() {
    setShowDescription(false);
  }

  function showModal(value, type) {
    setShowModal(true);
    setModalValue(prevValues => {
      return {
        ...prevValues,
        value,
        type
      }
    });
  }

  return (
      <div
        className={`${classes['cell-div']}`}
        ref={preparationCellRef}
        data-type={props.type}
        data-value={props.value}
        draggable={showCards ? true : false}
        onDragStart={(event) => onDragStart(event, props.id, props.type)}
        onDragEnd={(event) => onDragEnd(event, props.id, props.type)}
        onDragOver={(event) => onDragOver(event, props.type)}
        onDrop={(event) => onDrop(event, props.id, props.type)}
        onDragEnter={(event) => onDragEnter(event, props.type)}
        onDragLeave={onDragLeave}
      >
        <div
          className={`${classes.cell} ${classes['preparation-back']} ${classes['cell-back']} ${showCards ? classes['cell-back-reverse'] : null} ${props.type === 1 ? classes['greens'] : classes['blacks']}`}
        ></div>
        <div
          className={`${classes.cell} ${classes['cell-front']} ${showCards ? classes['cell-front-reverse'] : null}`}
          onMouseEnter={showDescription}
          onMouseLeave={hideDescription}
          style={{'backgroundImage': `url('${process.env.PUBLIC_URL}/Images/Dragons/${props.img}_${props.type}.jpg')`}}
          onClick={() => showModal(props.img, props.type)}
        >
          <div className={`${classes['cell-label-power']} ${props.type === 1 ? classes['greens'] : classes['blacks']}`} data-value={props.value}>{props.value}</div>
        </div>
      </div>
  );
}

export default PreparationCell;