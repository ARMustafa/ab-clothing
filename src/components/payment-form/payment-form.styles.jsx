import styled from 'styled-components';
import Button from '../button/button.component';

export const PaymentFormContainer = styled.div`
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const FormContainer = styled.form`
    min-width: 500px;
    height: 100px;
`;

export const PaymentButton = styled(Button)`
    margin-top: 30px;
    margin-left: auto;
`;

