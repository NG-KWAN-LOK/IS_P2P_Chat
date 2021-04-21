import React, { useState, useCallback } from "react"
import { useDispatch } from "react-redux"

import { setIsPopUpQRCodeDisplay } from "../../../container/CoreLayout/reducer"
import styles from "./styles.module.scss";

const SettingMenu = ({ setIsDisplay }) => {
    const dispatch = useDispatch()
    return (
        <div className={styles.container}>
            <div className={styles.setting_under}>
                <div className={styles.setting_under_subtitle} onClick={() => { setIsDisplay(); dispatch(setIsPopUpQRCodeDisplay(true)) }}>
                    Invite your friends
                </div>
            </div>
        </div>
    )
}

export default React.memo(SettingMenu)