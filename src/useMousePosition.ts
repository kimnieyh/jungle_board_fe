import { useState, useEffect } from "react";
interface Position {
    clientX: number;
    clientY: number;
}
const useMousePosition = () => {
    const [position, setPosition] = useState<Position>({
        clientX: 0,
        clientY: 0,
    });

    const updatePosition = (event:MouseEvent) => {
        const { clientX, clientY } = event;

        setPosition({
            clientX,
            clientY,
        });
    };

    useEffect(() => {
        document.addEventListener("mousemove", updatePosition);
        document.addEventListener("mouseenter", updatePosition);

        return () => {
            document.removeEventListener("mousemove", updatePosition);
            document.removeEventListener("mouseenter", updatePosition);
        };
    }, []);

    return position;
};

export default useMousePosition;