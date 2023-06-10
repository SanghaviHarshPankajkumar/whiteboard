import { useEffect, useLayoutEffect, useState } from "react"
import rough from '../../../node_modules/roughjs/bundled/rough.esm'

import useStyles from './styles'

const generator = rough.generator();

const WhiteBoard = (prop) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const { value, elements, setElements, color, ctxRef, canvasRef, user, socket } = prop;
    const [image, setImage] = useState(null);

    const classes = useStyles();

    useEffect(() => {


        socket.on('imageGetFirst', (data) => {
            console.log('inside the image get first');
            setImage(data.image);

        })
    }, []);
    useEffect(() => {
        socket.on("canvasImage", (data) => {
            console.log('inside the image');
            setImage(data.image);
        })
    }, []);
    if (user?.joiner) {
        return (
            <div className={classes.container}>
                <div className={classes.canvasBox}>
                    <img alt="Canvas" src={image} />
                </div>
            </div>
        )
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.height = window.innerHeight * 0.70;
        canvas.width = window.innerWidth;
        const context = canvas.getContext('2d');
        context.strokeStyle = color;
        context.strokeWidth = 3;
        context.lineWidth = 3;
        ctxRef.current = context;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        ctxRef.current.strokeStyle = color;
    }, [color])

    useLayoutEffect(() => {
        // console.log('inside the layout change');
        const roughCanvas = rough.canvas(canvasRef.current);
        if (elements.length > 0) {
            ctxRef.current.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );
        }
        elements.forEach((ele, i) => {
            if (ele.element === 'pencil') {
                console.log('inside the pencil');
                roughCanvas.linearPath(ele.path, {
                    stroke: ele.stroke,
                    roughness: 0,
                    strokeWidth: 3
                });
            }
            else if (ele.element === 'Rect') {
                roughCanvas.draw(generator.rectangle(ele.offsetX, ele.offsetY, ele.width, ele.height, {
                    stroke: ele.stroke,
                    roughness: 0,
                    strokeWidth: 3
                }))
            }
            else if (ele.element === 'Line') {
                roughCanvas.draw(generator.line(ele.offsetX, ele.offsetY, ele.width, ele.height, {
                    stroke: ele.stroke,
                    roughness: 0,
                    strokeWidth: 3
                }))
            }
        });
        const imageUrl = canvasRef.current.toDataURL();
        socket.emit('imageSend', { image: imageUrl, roomId: user.roomId });
    }, [elements])

    const onMouseDown = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        console.log(offsetX, offsetY);
        if (value == 'pencil') {
            setElements((prev) => [
                ...prev,
                {
                    offsetX,
                    offsetY,
                    path: [[offsetX, offsetY]],
                    stroke: color,
                    element: 'pencil'
                },
            ]);
        }
        else {
            setElements((prev) => [
                ...prev,
                {
                    offsetX, offsetY, element: value, stroke: color
                }
            ])
        }
        setIsDrawing(true);

    }
    const onMouseMove = (e) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = e.nativeEvent;
        console.log(offsetX, offsetY);
        if (value === 'pencil') {
            setElements((prev) => prev.map((ele, i) => i === prev.length - 1 ? {
                ...ele,
                path: [...ele.path, [offsetX, offsetY]],
            } : ele)
            );
            console.log(elements);
        }
        else if (value === 'Rect') {
            setElements((prev) => prev.map((ele, i) => i === prev.length - 1 ? {
                ...ele, width: offsetX - ele.offsetX, height: offsetY - ele.offsetY
            } : ele))
        }
        else if (value === 'Line') {
            setElements((prev) => prev.map((ele, i) => i === prev.length - 1 ? {
                ...ele, width: offsetX, height: offsetY
            } : ele))
        }
    }
    const onMouseUp = (e) => {
        console.log('mouse up');
        setIsDrawing(false);
    }

    return (
        <div className={classes.container}>
            <div className={classes.canvasBox}
                onMouseMove={onMouseMove}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp} >
                <canvas ref={canvasRef} />
            </div>
        </div>
    )
}

export default WhiteBoard
