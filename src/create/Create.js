    import React, { useState } from "react";
    import { Container } from "react-bootstrap";
    import CreateStepper from './CreateStepper';
    import StepOne from './StepOne';
    import StepTwo from './StepTwo';
    import StepThree from './StepThree';
    import StepFour from './StepFour';
    import StepFive from './StepFive';
    import { useSelector } from "react-redux";

    export default function Create() {
        const system = useSelector(state => state.system);

        return (
            <>
                <Container className="text-center">
                    <h2>Create DropFile</h2>
                    <CreateStepper step={system.createStep-1}/>
                    { system.createStep === 1 && <StepOne /> }
                    { system.createStep === 2 && <StepTwo /> }
                    { system.createStep === 3 && <StepThree /> }
                    { system.createStep === 4 && <StepFour /> }
                    { system.createStep === 5 && <StepFive /> }
                </Container>
            </>
        );
    }