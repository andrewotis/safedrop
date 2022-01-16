    import React, { useState } from "react";
    import { Container } from "react-bootstrap";
    import CreateStepper from './CreateStepper';
    import StepOne from './StepOne';
    import StepTwo from './StepTwo';
    import StepThree from './StepThree';
    import StepFour from './StepFour';
    import StepFive from './StepFive';
    import StepSix from './StepSix';
    import { useSelector } from "react-redux";

    export default function Create() {
        const state = useSelector(state => state);

        return (
            <>
                <Container className="text-center">
                    <h2>Create encrypted database</h2>
                    <CreateStepper step={state.createStep-1}/>
                    { 
                        state.createStep === 1 &&
                            <StepOne />
                    } {
                        state.createStep === 2 &&
                            <StepTwo />
                    } {
                        state.createStep === 3 &&
                            <StepThree />
                    } {
                        state.createStep === 4 &&
                            <StepFour />
                    } {
                        state.createStep === 5 &&
                            <StepFive />
                    } {
                        state.createStep === 6 &&
                            <StepSix />
                    }
                </Container>
            </>
        );
    }