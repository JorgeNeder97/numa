const SpeedIcon = ({ width, height } : { width: string, height: string }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 26 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-[8px]"
        >
            <path
                d="M4.51467 21C2.83646 19.3615 1.69358 17.274 1.23057 15.0013C0.767561 12.7287 1.00521 10.3731 1.91346 8.2323C2.82172 6.09153 4.35979 4.26179 6.33318 2.97445C8.30656 1.68711 10.6266 1 13 1C15.3734 1 17.6934 1.68711 19.6668 2.97445C21.6402 4.26179 23.1783 6.09153 24.0865 8.2323C24.9948 10.3731 25.2324 12.7287 24.7694 15.0013C24.3064 17.274 23.1635 19.3615 21.4853 21M18.3333 7.50865L13 12.7157"
                stroke="#00BC7D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default SpeedIcon;