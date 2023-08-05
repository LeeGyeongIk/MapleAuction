import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

import Arona from '../Img/아로나.jpg';
import BlueArchive from '../Img/블루아카이브.jpg';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

let RiseUp = (from, to) => keyframes`
    from {
        transform: translateY(${from});
    }

    to {
        transform: translateY(${to});
    }
`
let FadeIn = (from, to) => keyframes`
    from {
        opacity: ${from};
    }

    to {
        opacity: ${to};
    }
`
let BlueArchiveImg = styled.img`
    margin: auto;
    display: block;
    animation: ${props => RiseUp(props.RiseUp_from, props.RiseUp_to)} 0.5s ease-out forwards,
               ${props => FadeIn(props.FadeIn_from, props.FadeIn_to)} 0.5s ease-out forwards;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
`
let AronaBG = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url(${Arona});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`
let SignInForm = styled.div`
    width: 40vw;
    @media screen and (max-width: 1000px) {
        width: 90vw;
    };
    margin: auto;
    padding: 5%;
    background-color: rgb(255, 255, 255, 0.7);
    animation: ${props => RiseUp(props.RiseUp_from, props.RiseUp_to)} 0.8s ease-out forwards,
               ${props => FadeIn(props.FadeIn_from, props.FadeIn_to)} 0.8s ease-out forwards;
`

let Login = () => {
    const [ID, setID] = useState("");
    const [PASSWORD, setPASSWORD] = useState("");
    const [AUTO_LOGIN, setAUTO_LOGIN] = useState(false);

    return (
        <AronaBG>
            <Logo />
            <SignIn
                ID={ID}
                PASSWORD={PASSWORD}
                setID={setID}
                setPASSWORD={setPASSWORD}
            />
        </AronaBG>
    )
};

let Logo = () => {
    return (
        <div>
            <BlueArchiveImg
                src={BlueArchive}
                RiseUp_from="70%"
                RiseUp_to="30%"
                FadeIn_from="0"
                FadeIn_to="1"
            />
        </div>
    )
}

let SignIn = (props) => {
    return (
        <SignInForm
            RiseUp_from="70%"
            RiseUp_to="30%"
            FadeIn_from="0"
            FadeIn_to="1">
            <Form action="/Main" method="POST">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>아이디</Form.Label>
                    <Form.Control type="email" placeholder="아이디를 입력하세요" autoComplete='off' onChange={(e) => {
                        props.setID(e.target.value);
                    }} />
                    <Form.Text className="text-muted">
                        다른사람과 아이디 및 패스워드를 공유하지 마세요.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>패스워드</Form.Label>
                    <Form.Control type="password" placeholder="패스워드를 입력하세요" onChange={(e) => {
                        props.setPASSWORD(e.target.value);
                    }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="로그인 상태 유지" />
                </Form.Group>
                <Button variant="primary" onClick={async () => {
                    await axios.post('/RequestLogin', {
                        ID: props.ID,
                        PASSWORD: props.PASSWORD
                    }).then((response) => {
                        TrySignIn(response.data.SIGN_IN_RESULT);
                    })
                }}>
                    로그인
                </Button>
            </Form>
        </SignInForm>
    );
}

let TrySignIn = (result) => {
    if (result === true) {
        console.log("로그인 성공");
    }
    else if (result === false) {
        console.log("로그인 실패");
    }
    else {
        console.log(`데이터 이상: ${result}`);
    }
}

export default Login;