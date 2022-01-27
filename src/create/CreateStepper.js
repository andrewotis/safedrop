import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Stepper from 'react-stepper-horizontal';

export default function CreateStepper({ step }) {
    return (
        <Stepper 
            steps={[
                {title: 'generate system keypair'},
                {title: 'provide passphrase'},
                {title: 'practice passphrase'},
                {title: 'generate user keypair'},
                {title: 'download dropfile'},
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