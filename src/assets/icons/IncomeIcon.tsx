const IncomeIcon = ({stroke, width, height} : { stroke: string, width: string, height: string }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M13.5 20.5H10.5C10.2348 20.5 9.98043 20.3946 9.79289 20.2071C9.60536 20.0196 9.5 19.7652 9.5 19.5V11.5C9.5 11.2348 9.60536 10.9804 9.79289 10.7929C9.98043 10.6054 10.2348 10.5 10.5 10.5H22.5C22.7652 10.5 23.0196 10.6054 23.2071 10.7929C23.3946 10.9804 23.5 11.2348 23.5 11.5V14.5"
                stroke={stroke}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M18.5 24.5H14.5C14.2348 24.5 13.9804 24.3946 13.7929 24.2071C13.6054 24.0196 13.5 23.7652 13.5 23.5V15.5C13.5 15.2348 13.6054 14.9804 13.7929 14.7929C13.9804 14.6054 14.2348 14.5 14.5 14.5H26.5C26.7652 14.5 27.0196 14.6054 27.2071 14.7929C27.3946 14.9804 27.5 15.2348 27.5 15.5V18"
                stroke={stroke}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M22.414 18.917C22.3126 18.5847 22.1264 18.2845 21.8737 18.046C21.621 17.8076 21.3106 17.6391 20.9729 17.5571C20.6353 17.4751 20.2821 17.4825 19.9482 17.5785C19.6143 17.6746 19.3112 17.856 19.0687 18.1048C18.8262 18.3536 18.6527 18.6613 18.5653 18.9976C18.478 19.3339 18.4797 19.6871 18.5703 20.0225C18.661 20.3579 18.8375 20.6639 19.0824 20.9104C19.3273 21.1568 19.6322 21.3352 19.967 21.428M22.5 24.5H28.5M22.5 24.5L25.5 21.5M22.5 24.5L25.5 27.5"
                stroke={stroke}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default IncomeIcon;