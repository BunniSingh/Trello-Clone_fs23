import React, { useState, useRef, useContext } from 'react'
import style from './CardList.module.css'
import { Card } from '../Card/Card.jsx'
import { MyContext } from '../../App.jsx'
import { useDrop } from 'react-dnd'
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const CardList = ({typeOfList, heading }) => {
    const { state, dispatch } = useContext(MyContext);
    // console.log(state);
    const [properties, ref] = useDrop(()=>({
        accept: 'Card',
        drop: (item) => {
            const {title, index} = item;
            console.log(item);
            dispatch({
                type: 'Move_Item',
                payload: {  
                    fromList: item.typeOfList,
                    toList: typeOfList,
                    index
                }
            })
        }
    }))
    const [isVisible, setIsVisible] = useState(false);
    const textAreaRef = useRef(null);
    const addCardInDataList = () => {
        const title = textAreaRef.current.value.trim();
        if(!title){
            alert('Please Enter a title');
            return;
        }

        dispatch({
            type: 'Add_Item',
            payload: {
                typeOfList,
                title
            }
        })
        textAreaRef.current.value = "";
        setIsVisible(false);
    }
    return (
        <div ref= {ref} className={style.cardlist}>
            <h2>{heading}</h2>
            <div className={style['Card-container']}>
                {
                    state[typeOfList]
                        .map((ele, idx) => <Card
                            key={`id_${idx}`}
                            title={ele}
                            index={idx}
                            typeOfList={typeOfList}
                        />)
                }
                {isVisible ? (
                    <div className={style.textField}>
                        <textarea ref={textAreaRef} autoFocus />
                        <div className={style.btns}>
                            <button title='Add to list' onClick={addCardInDataList}><IoIosAddCircleOutline/></button>
                            <button title='Cancel' onClick={() => setIsVisible(false)}><MdCancel/></button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsVisible(true)}
                        className={style['card-add-btn']}
                    >
                        + Add
                    </button>

                )}
            </div>
        </div>
    )
}

export default CardList