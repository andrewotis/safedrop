    import React, { useState } from "react";
    import { Container, Row, Col, Button, Form } from "react-bootstrap";
    import CreateStepper from './CreateStepper';
    import StepOne from './StepOne';
    import StepTwo from './StepTwo';
    import StepThree from './StepThree';
    import StepFour from './StepFour';
    import StepFive from './StepFive';
    import StepSix from './StepSix';

    export default function Create({ setPage }) {
        const [step, setStep] = useState(1); //useState(1);
        const [passphrase, setPassphrase] = useState(''); //useState('');
        const [publicKey, setPublicKey] = useState(null);
        const [privateKey, setPrivateKey] = useState(null);

        return (
            <>
                <Container className="text-center">
                    <h2>Create encrypted database</h2>
                    <CreateStepper step={step-1}/>
                    { 
                        step === 1 && 
                            <StepOne 
                                passphrase={passphrase} 
                                setPassphrase={passphrase => setPassphrase(passphrase)} 
                                next={() => setStep(2)} 
                            /> 
                    }
                    { 
                        step === 2 && 
                            <StepTwo
                                passphrase={passphrase} 
                                next={() => setStep(3)} 
                            /> 
                    }
                    { 
                        step === 3 && 
                            <StepThree
                                setPublicKey={key => setPublicKey(key)}
                                setPrivateKey={key => setPrivateKey(key)}
                                passphrase={passphrase}
                                next={() => setStep(4)} 
                            /> 
                    }
                    { 
                        step === 4 && 
                            <StepFour
                                next={() => setStep(5)} 
                            />
                    }
                    { 
                        step === 5 && 
                            <StepFive
                                next={() => setStep(6)} 
                                passphrase={passphrase}
                            />
                    }
                    { 
                        step === 6 && 
                            <StepSix
                                next={() => setPage('Authenticate')} 
                                publicKey={publicKey}
                                privateKey={privateKey}
                            />
                    }
                </Container>
            </>
        );
    }