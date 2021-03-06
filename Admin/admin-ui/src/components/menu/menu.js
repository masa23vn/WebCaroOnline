import React, {useState} from 'react';
import SideBar from "./sideBar";
import Topbar from "./topBar";

export default function Menu(props) {
    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Topbar
                handleDrawerOpen = {(i) => handleDrawerOpen()}
                open = {open}
                title = {props.title}
            />
            <SideBar
                handleDrawerClose = {(i) => handleDrawerClose()}
                open = {open}
            />
        </>
    )
}
