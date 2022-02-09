import React, { useState } from "react";
import { Container, Row, Col, Button, Form, ListGroup } from "react-bootstrap";
import { specific } from 'react-files-hooks';
import * as utilities from '../utilities';
import * as dispatchers from '../state/dispatchers';
import { useSelector } from "react-redux";
import { initialStateDropfileData } from "../state/initialStateDropfileData";

export default function StepSix() {
    const state = useSelector(state => state);
    const [downloadUrl, setDownloadUrl] = useState('');
    const [downloaded, setDownloaded] = useState(false);
    const { download } = specific.useJSONDownloader();
  
    const dlData = {
        keys: {
            publicKeyArmored: state.dropFile.keys.publicKeyArmored,
            privateKeyArmored: state.dropFile.keys.privateKeyArmored,
            revokationCert: state.dropFile.keys.revokationCertificate
        },
        data: initialStateDropfileData
    }

    const next = _ => {
        dispatchers.setCurrentPage('Authenticate');
    }

    const handleDownload = async () => {
        // encrypt the data object
        const encryptedDropfileData = await utilities.encryptStringWithArmoredKey(JSON.stringify(dlData.data), state.dropFile.keys.publicKeyArmored);

        download({
            data: JSON.stringify({...dlData, data: encryptedDropfileData}),
            name: 'safedrop.json'
        });
        setDownloaded(true);
    }

    const determineButtonAction = _ => !downloaded ? () => handleDownload() : () => next();
   
    return (
        <Container>
            <Row>
                <Col sm={8} md={8} lg={8} xl={8} className="m-auto mt-5">
                    <Form.Group className="mb-3" >
                        <Form.Label>
                            <div>Click the button below to download your encrypted database.</div>
                            <div className="text-muted fs-7 mb-4">
                                <p>Remember to keep it in a safe place where you will remember where it is!</p>
                                <p>You will need to load it in order to use the app.</p>
                            </div>
                        </Form.Label>
                        <br />
                        <Button 
                            variant="light"
                            size="sm"
                            onClick={determineButtonAction()}
                        >
                            {!downloaded ? 'Download' : "Continue!"}
                        </Button>
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    )
}