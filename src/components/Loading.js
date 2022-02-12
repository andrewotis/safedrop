import React from 'react';
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Loading() {
    const state = useSelector(state => state);

    if(!state.system.loading) {
        return null;
    }

    return(
        <>
            <div className="m-5 m-auto p-5 text-secondary text-center" style={{
                height: '100vh',
                width: '99.9vw',
                position: 'absolute',
                top: 0,
                left: 1,
                background: 'rgba(0, 0, 0, 0.9)',
                zIndex: 40
            }}>
                <br /><br /><br /><br /><br /><br /><br />
                <Spinner animation="border" style={{height: '100px', width: '100px'}} variant="secondary">
                    <br />loading...
                </Spinner>
                <br />
            </div>
        </>
    );
}