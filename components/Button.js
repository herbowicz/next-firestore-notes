import Button from 'react-bootstrap/Button';

function StyledButton({ children, variant }) {
    return (
        <>
            <style type="text/css">
                {`
                    .btn-normal {
                        padding: 1rem;
                        font-size: 1rem;
                    }
                    .btn-xxl {
                        padding: 1rem 1.5rem;
                        font-size: 1.5rem;
                    }
                    .btn-flat {
                        background-color: purple;
                        color: white;
                    }
                    .btn-close {
                        background: red;
                        color: white;
                        font-size: small;
                        margin-top: -15px;
                        margin-left: -15px;
                        z-index: 5;
                    }
                `}
            </style>

            <Button variant={variant} size='normal'>
                { children }
            </Button>
        </>
    );
}

export default StyledButton;