import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './Card.module.css'
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { MyContext } from '../../App';
import { FaSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useDrag } from 'react-dnd';


export const Card = ({title, index, typeOfList}) => {
    const [properties, ref] = useDrag(()=> ({
        type: "Card",
        item: {title, typeOfList, index},
        collect: (monitor) =>({
            opacity: 1
        })
    }))
    const {state, dispatch} = useContext(MyContext);
    const [isVisible , setVisible] = useState(false);
    const editTextRef = useRef();

    const editFn = () =>{
        setVisible(true);
    }

    const saveTitleFn = () =>{
        let newValue = editTextRef.current.value.trim();
        if(!newValue) {
            alert('Title can not be empty')
        }
        dispatch({
            type: "Edit_Item",
            payload: {
                newValue,
                index,
                typeOfList
            }
        })
        console.log("Item seved")
        setVisible(false);
    }
    const deleteFn = () =>{
        dispatch({
            type: "Delete_Item",
            payload: {
                index,
                typeOfList
            }
        })
    }

    useEffect(()=>{
        if(isVisible){
            editTextRef.current.value = title;
        }
    },[isVisible])


  return (
    <div ref={ref} className={style.card}>
        
            {
                isVisible ? (
                    <div className={style.editBox}>
                        <textarea ref = {editTextRef} autoFocus/>
                        <div className={style.btn}>
                            <button title='Save' onClick={saveTitleFn}><FaSave/></button>
                            <button title='Cancel' onClick={()=> setVisible(false)}><MdOutlineCancel/></button>
                        </div>
                    </div>
                ) :
                (
                    <div className={style.btns}>
                        <span>{title}</span>
                        <div className={style.btn}>
                            <button title='Edit' onClick={editFn}><CiEdit/></button>
                            <button title='Delete' onClick={deleteFn}><MdDeleteForever/></button>
                        </div>
                    </div>
                )
            }
        
    </div>
  )
}

