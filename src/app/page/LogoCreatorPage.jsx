import { useEffect, useState } from "react";
import { useRef } from "react";
import ColorsSelector from "../component/ColorsSelector";
import { collection, addDoc, getDocs } from "firebase/firestore/lite";
import db from '../../setup/firebase'
import { useParams } from "react-router-dom";

const gridCellSize = 10

const LogoCreatorPage = () => {
    const gameRef = useRef(null);
    const cursorRef = useRef(null);
    const [color, setColor] = useState("#000");
    const [game, setGame] = useState(null);
    const [cursor, setCursor] = useState(null);
    const [ctx, setCtx] = useState(null);
    const { team_id } = useParams();
    
    useEffect(() => {
        const game = gameRef.current;
        const cursor = cursorRef.current;
        const ctx = game.getContext('2d');
        const gridCtx = game.getContext('2d');
        setGame(game);
        setCursor(cursor);
        setCtx(ctx);
        game.width = 1600
        game.height = 700

        drawGrids(gridCtx, game.width, game.height, gridCellSize, gridCellSize)

        getPixels(ctx)

        game.addEventListener('mousemove', function (event) {
            const cursorLeft = event.clientX - (cursor.offsetWidth / 2)
            const cursorTop = event.clientY - (cursor.offsetHeight / 2)
        
            cursor.style.left = Math.floor(cursorLeft / gridCellSize) * gridCellSize + "px"
            cursor.style.top = Math.floor(cursorTop / gridCellSize) * gridCellSize + "px"
        })
    }, [team_id])

    async function getPixels(ctx) {
        const pixelCol = collection(db, team_id);
        const pixelSnapshot = await getDocs(pixelCol);
        const pixelList = pixelSnapshot.docs.map(doc => doc.data());
        console.log("getPixels ctx : ", ctx)
        pixelList.forEach(pixel => {
            console.log("getPixels firestore : ", pixel)

            createPixel({
                x: pixel.x,
                y: pixel.y,
                color: pixel.color,
                ctx
            })
        })
    }

    function createPixel({x, y, color, ctx}) {
        console.log("createPixel : ", x, y, color)
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.fillRect(x, y, gridCellSize, gridCellSize)
    }

    async function addPixelIntoGame() {
        const x = cursor.offsetLeft
        const y = cursor.offsetTop - game.offsetTop
    
        createPixel({x, y, color, ctx})
        const pixel = {x, y, color}
        await addDoc(collection(db, team_id), pixel, { merge: true});
    }

    function drawGrids(ctx, width, height, cellWidth, cellHeight) {
        ctx.beginPath()
        ctx.strokeStyle = "#ccc"
    
        for (let i = 0; i < width; i++) {
            ctx.moveTo(i * cellWidth, 0)
            ctx.lineTo(i * cellWidth, height)
        }
    
        for (let i = 0; i < height; i++) {
            ctx.moveTo(0, i * cellHeight)
            ctx.lineTo(width, i * cellHeight)
        }
        ctx.stroke()
    }

    return ( 
        <div>
            <h1>Pixel War ESD - Logo Team Creator</h1>

            <div id="cursor" ref={cursorRef} onClick={addPixelIntoGame}></div>
            <canvas id="game" ref={gameRef} onClick={addPixelIntoGame}></canvas>

            <div style={{
                position: "fixed", 
                bottom: 50, 
                letf: 0, 
                zIndex: 9,
                width: "100%",
                }}>
                <ColorsSelector color={color} setColor={setColor} />
            </div>
        </div>
     );
}
 
export default LogoCreatorPage;