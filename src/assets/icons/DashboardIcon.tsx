const DashboardIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M4.75 11.0833C4.75 12.763 5.41726 14.3739 6.60499 15.5617C7.79272 16.7494 9.40363 17.4167 11.0833 17.4167C12.763 17.4167 14.3739 16.7494 15.5617 15.5617C16.7494 14.3739 17.4167 12.763 17.4167 11.0833C17.4167 9.40363 16.7494 7.79272 15.5617 6.60499C14.3739 5.41726 12.763 4.75 11.0833 4.75C9.40363 4.75 7.79272 5.41726 6.60499 6.60499C5.41726 7.79272 4.75 9.40363 4.75 11.0833Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.0833 4.75V11.0833H17.4167M14.25 26.9167V33.25M26.9167 22.1667V33.25M20.5833 20.5833V33.25M33.25 19V33.25"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default DashboardIcon;