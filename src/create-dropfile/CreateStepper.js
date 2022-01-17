import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Stepper from 'react-stepper-horizontal';

export default function CreateStepper({ step }) {
    return (
        <Stepper 
            steps={[
                {title: 'set passphrase'},
                {title: 'confirm passphrase'},
                {title: 'generate keypair'},
                {title: 'watch video'},
                {title: 'practice passphrase'},
                {title: 'download database'},
            ]} 
            activeStep={ step }
            activeColor="#737373"
            activeTitleColor="#e6f3ff"
            defaultColor="#e6f3ff"
            circleFontColor="#000"
            circleFontSize={13}
            size={30}
        />
    );
}