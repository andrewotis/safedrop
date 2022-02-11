import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Loading from "./Loading";
import {triedToPaste} from "../state/slices/system/systemUtils";
import {generateKeypair} from "../filesystem-encryption/openPgpWrapper";
import {encryptString, getSystemPublicKey} from "../filesystem-encryption/openPgpUtils";
import {initialStateDropfileData} from "../state/initialStateDropfileData";
import {createNewFileHandle, writeFile} from "../filesystem-encryption/fsApiWrapper";
import {setCurrentPage} from "../state/slices/system/systemDispatchers";

export default function ChangePassphrase({fileHandle, setFileHandle}) {
    const [oldPassphrase, setOldPassphrase] = useState('');
    const [newPassphrase, setNewPassphrase] = useState('');
    const [confirmNewPassphrase, setConfirmNewPassphrase] = useState('');
    const [pin, setPin] = useState('');

    const handleClick = async() => {

    }

    const determineDisabled = _ => {
    // if the new PASSPHRASE is filled in and matches the old PASSPHRASE, disabled
        if(newPassphrase !== '' && newPassphrase === oldPassphrase) {
            return true;
    // if any of the fields are empty
        } else if(oldPassphrase === '' || newPassphrase === '' || confirmNewPassphrase === '' || pin === '') {
            return true;
    // if the new PASSPHRASE does not have at least 10 characters
        } else if(newPassphrase.length < 11) {
            return true;
        } else {
            return false;
        }
    }

    return (
      <Container>
          <Loading />
          <Row className="w-100 mb-4">
              <Col className="w-100 text-center fs-3 m-auto">
                  Change Passphrase
              </Col>
          </Row>
          <Row>
              <Col sm={4} md={4} lg={4} xl={4} className="m-auto">
                  <Form.Group className="mb-3" >
                      <Form.Label>Old Passphrase</Form.Label>
                      <Form.Control
                          size="sm"
                          type="password"
                          value={ oldPassphrase }
                          placeholder="Enter passphrase"
                          onChange={ e => setOldPassphrase(e.target.value) }
                          onPaste={ () => triedToPaste() }
                      />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                      <Form.Label>Pin</Form.Label>
                      <Form.Control
                          size="sm"
                          type="password"
                          value={ pin }
                          placeholder="Enter pin"
                          onChange={ e => setPin(e.target.value) }
                          onPaste={ () => triedToPaste() }
                      />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                      <Form.Label>New Passphrase</Form.Label>
                      <Form.Control
                          size="sm"
                          type="password"
                          value={ newPassphrase }
                          placeholder="Enter new passphrase"
                          onChange={ e => setNewPassphrase(e.target.value) }
                          onPaste={ () => triedToPaste() }
                      />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                      <Form.Label>Confirm New Passphrase</Form.Label>
                      <Form.Control
                          size="sm"
                          type="password"
                          value={ confirmNewPassphrase }
                          placeholder="Enter new passphrase again"
                          onChange={ e => setConfirmNewPassphrase(e.target.value) }
                          onPaste={ () => triedToPaste() }
                      />
                  </Form.Group>
                  <Button
                      variant="light"
                      size="sm"
                      disabled={determineDisabled}
                      onClick={() => handleClick()}
                  >
                      Update
                  </Button>
              </Col>
          </Row>
      </Container>
    );
}