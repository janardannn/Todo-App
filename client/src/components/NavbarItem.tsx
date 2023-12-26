import React from "react";

export default function NavbarItem(props: any) {
    return (
        <div className="border-2 p-3 text-center w-[280px]" onClick={props.DisplayClickedNavbarItem}>
            {props.todoTitle}
        </div>
    )
}