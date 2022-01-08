import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function DownloadModal({ close }) {
    const [show, setShow] = useState(true)
    return (
        <Modal centered={true} show={show}>
            <Modal.Header closeButton>
                <Modal.Title>Download Your Data!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>We will not ever save or store your data, but this app does rely on using your stored data.</p>
                <p>Therefore, <span className="text-underline">YOU</span> are responsible for saving and keeping your data!</p>
                <p>To save your data, "INSERT INSTRUCTIONS HERE".</p>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => setShow(false)} variant="secondary">I understand</Button>
            </Modal.Footer>
        </Modal>
    );
}