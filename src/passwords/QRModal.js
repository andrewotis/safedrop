import React from 'react';
import QRCode from "react-qr-code";
import { Modal } from "react-bootstrap";
//import {Icon} from "@iconify/react/dist/iconify";
//import Loading from "../components/Loading";

export default function QRModal({ value, show, setShow }) {
    if(!show) {
        return false;
    }
    return (
        <>
            <Modal
                size="md"
                centered
                show={show}
                backdrop="static"
                onHide={() => setShow(false)}
            >
                <Modal.Header
                    closeButton
                    className="text-secondary bg-black"
                    closeVariant="white"
                >
                    <Modal.Title id="contained-modal-title-vcenter">
                        QR Code ({value})
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    className="pt-5 text-white text-center bg-white"
                    style={{minHeight: '350px'}}
                >
                    <QRCode value={value} />
                </Modal.Body>
            </Modal>
        </>
    );
}