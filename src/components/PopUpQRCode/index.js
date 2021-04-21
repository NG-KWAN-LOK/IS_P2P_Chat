import React from "react"
import { useDispatch } from "react-redux";

import styles from "./styles.module.scss";

import { setIsPopUpQRCodeDisplay } from "../../container/CoreLayout/reducer";

import QRCode from "../../image/QRCode.jpg"

const PopUpQRCode = () => {
    const dispatch = useDispatch();

    return (
        <div className={styles.popUpContainer}>
            <div className={styles.popUpContainer_displayFrame}>
                <i className={styles.popUpContainer_displayFrame_close} onClick={() => { dispatch(setIsPopUpQRCodeDisplay(false)) }}></i>
                <div className={styles.popUpContainer_displayFrame_element}>
                    <div className={styles.popUpContainer_displayFrame_element_QRCode}>
                        <img src={QRCode} className={styles.popUpContainer_displayFrame_element_QRCode_img} />
                    </div>
                    <div className={styles.popUpContainer_displayFrame_element_text}>
                        Ask your friends to scan the QRCode to join us!
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopUpQRCode