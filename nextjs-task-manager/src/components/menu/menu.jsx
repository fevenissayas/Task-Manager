import React from "react";
import Link from "next/link";

export default function Menu() {
    return(
        <>
            <Link href="/">home</Link>
            <Link href="../about/pages.jsx">about us</Link>
        </>
    )
    
}