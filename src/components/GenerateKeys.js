    import React, { useState } from "react";
    import { Form, Container, Col, Row, Button, Placeholder, Spinner } from "react-bootstrap";
    import DownloadModal from './DownloadModal';
    import { generateKeypair } from './../utilities';

    export default function GenerateKeys() {
        const [loading, setLoading] = useState(false);
        const [showModal, setShowModal] = useState(false);
        const [keypair, setKeypair] = useState({
            userName: '',
            keypairName: '',
            keypairType: 'rsa',
            passphrase: '',
            keys: {
                public: null,
                private: null
            }
        });

        const generateKeys = async (e) => {
            e.preventDefault();
            setLoading(true);
            const { privateKey, publicKey } = await generateKeypair(keypair.keyType, keypair.userName, keypair.passphrase);
            setKeypair({
                ...keypair,
                keys: {
                    public: publicKey,
                    private: privateKey
                }
            });
            setLoading(false);
            setShowModal(true);
            return true;
        };

        const formLabel = (text, required = false) => required ? <Form.Label>{text} <span className="text-warning fs-6">*required</span></Form.Label> : <Form.Label>{text}</Form.Label>

        if(loading) {
            return (
                <Container fluid className="text-center">
                    <Spinner animation="grow" className="mt-5" role="status" size="lg" variant="light" /><br />
                    <span className="p-5 text-white">Loading...</span>
                </Container>
            );
        }

        return (<>
            <Container className="">
                <h2>Generate Keys</h2>
                <div className="hr mb-4"/>
                <Row>
                <Col sm="4" md="4" lg="4" xl="4">
                    <Form>
                        <Form.Group className="mb-3" >
                            {formLabel('Keypair Name', true)}
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="Enter keypair name"
                                onChange={ e => setKeypair({ ...keypair, keypairName: e.target.value }) }
                            />
                            <Form.Text className="text-muted">
                                For key identifiation/managmenet later on
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            {formLabel('Name')}
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="Enter your name"
                                onChange={ e => setKeypair({ ...keypair, userName: e.target.value }) }
                            />
                            <Form.Text className="text-muted">
                                Your name. Used when generating keys
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            {formLabel('Email')}
                            <Form.Control
                                size="sm"
                                type="email"
                                placeholder="Enter email address"
                                onChange={ e => setKeypair({ ...keypair, userEmail: e.target.value }) }
                            />
                            <Form.Text className="text-muted">
                                Used when generating keys
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            {formLabel('Passphrase', true)}
                            <Form.Control
                                size="sm"
                                type="password"
                                placeholder="Passphrase"
                                onChange={ e => setKeypair({ ...keypair, passphrase: e.target.value }) } 
                            />
                            <Form.Text className="text-muted">
                                To encrypt your private key. DON'T SHARE THIS WITH ANYONE!
                            </Form.Text>
                        </Form.Group>

                        <Button 
                            size="sm" 
                            variant="light" 
                            type="submit"
                            disabled={keypair.keypairName === '' || keypair.passphrase === ''}
                            onClick={e => generateKeypair(e)}
                        >
                            Generate
                        </Button>
                    </Form>
                </Col>
                <Col sm="1" md="1" lg="1" xl="1" />
                <Col>
                    <Form.Group className="mb-4" >
                        <Form.Label>Generated Keys <span className="text-muted">(will appear after they're generated)</span>:</Form.Label>
                        <Form.Control
                            as="textarea"
                            style={{ height: "145px", color: "#000" }}
                            disabled
                            value={ keypair.keys.public !== null ? keypair.keys.public : 'public key will appear here...' }>
                        </Form.Control>
                        <Form.Text className="text-muted">
                            PLEASE DO NOT SHARE YOUR PRIVATE KEY WITH ANYONE!!!!
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Control
                            as="textarea"
                            style={{ height: "145px", color: "#000" }}
                            disabled
                            value={ keypair.keys.private !== null ? keypair.keys.private : 'private key will appear here...' }>
                        </Form.Control>
                        <Form.Text>
                            Once generated, click anywhere inside these text boxes to copy the keys.
                        </Form.Text>
                    </Form.Group>
                </Col>
                </Row>
            </Container>
            {<DownloadModal close={() => setShowModal(false)}/>} 
        </>
    );
}
