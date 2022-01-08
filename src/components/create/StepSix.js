import React, { useState } from "react";
import { Container, Row, Col, Button, Form, ListGroup } from "react-bootstrap";
import { specific } from 'react-files-hooks';


export default function StepSix({ next, privateKey, publicKey }) {
    const [downloadUrl, setDownloadUrl] = useState('');
    const [downloaded, setDownloaded] = useState(false);
    const { download } = specific.useJSONDownloader();
  
    const dlData = {
        passphraseTester: 'valid',
        keys: {
            public: publicKey,
            private: privateKey
        },
        notes: [],
        passwords: [],
    }

    const handleDownload = _ => {
        download({
            data: JSON.stringify(dlData),
            name: 'db.crypt'
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
                            {!downloaded ? 'Download' : "Finish!"}
                        </Button>
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    )
}