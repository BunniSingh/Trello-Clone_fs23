import React from 'react'
import { GiCoffeeCup } from "react-icons/gi";
import style from './Footer.module.css'
const Footer = () => {
  return (
    <div className={style.footer}>
        <p>built with <GiCoffeeCup/>  by <a href="https://www.linkedin.com/in/banti-kr-singh/" target='_blank'>Bunny</a> | <a href="">&lt;/src code&gt;</a></p>
    </div>
  )
}

export default Footer