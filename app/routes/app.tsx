import React from "react";
import {Outlet} from "@remix-run/react";

export default function Index() {
    return (
        <>
            _app layout
           <Outlet/>
        </>
    );
}
