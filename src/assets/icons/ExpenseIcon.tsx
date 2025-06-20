const ExpenseIcon = ({stroke, width, height} : { stroke: string, width: string, height: string }) => {
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
                d="M22.42 18.937C22.322 18.6036 22.1389 18.3016 21.8886 18.0605C21.6383 17.8195 21.3296 17.6478 20.9928 17.5624C20.656 17.477 20.3027 17.4808 19.9678 17.5734C19.633 17.6661 19.328 17.8444 19.083 18.0908C18.838 18.3372 18.6614 18.6432 18.5706 18.9786C18.4799 19.314 18.478 19.6672 18.5654 20.0036C18.6527 20.3399 18.8261 20.6477 19.0685 20.8966C19.311 21.1455 19.6141 21.3269 19.948 21.423M22.5 24.5H28.5M28.5 24.5L25.5 21.5M28.5 24.5L25.5 27.5"
                stroke={stroke}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ExpenseIcon;