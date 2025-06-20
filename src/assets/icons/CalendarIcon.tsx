const CalendarIcon = ({ width, height } : { width: string, height: string }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 23 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-[6px]"
        >
            <path
                d="M16.75 1V6.33333M6.25 1V6.33333M1 11.6667H22M4.9375 15.6667H4.95456M8.88813 15.6667H8.89469M12.8256 15.6667H12.8322M16.7697 15.6667H16.7763M12.8322 19.6667H12.8388M4.95063 19.6667H4.95719M8.88813 19.6667H8.89469M1 6.33333C1 5.62609 1.27656 4.94781 1.76884 4.44772C2.26113 3.94762 2.92881 3.66667 3.625 3.66667H19.375C20.0712 3.66667 20.7389 3.94762 21.2312 4.44772C21.7234 4.94781 22 5.62609 22 6.33333V22.3333C22 23.0406 21.7234 23.7189 21.2312 24.219C20.7389 24.719 20.0712 25 19.375 25H3.625C2.92881 25 2.26113 24.719 1.76884 24.219C1.27656 23.7189 1 23.0406 1 22.3333V6.33333Z"
                stroke="#00BC7D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default CalendarIcon;