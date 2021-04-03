import React, {Component} from 'react';
import "./App.css";
import Snackbar from '@material-ui/core/Snackbar';

const DOT_RADIUS = 10;

class Page3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedDot: null,
            dots: new Map(
                [[1, {x: 100, y: 100}],
                       [2, {x: 200, y: 200}],
                       [3, {x: 100, y: 200}],
                       [4, {x: 50,  y: 100}]]),
            possibleEdges: [{dot1: 1, dot2: 2},
                            {dot1: 2, dot2: 3},
                            {dot1: 3, dot2: 4}],
            visitedDots: new Set([]),
            edgeToDraw: null,
            openAlreadyVisitedError: false,
            openInvalidEdgeError: false,
            verified: false
        };
        this.canvas = React.createRef();
    }

    componentDidMount() {
        this.initializeCanvas();
    }

    componentDidUpdate() {
        this.drawEdges();
        this.drawClickedDot();
        this.checkAllDotsVisited();
    }

    initializeCanvas() {
        let canvas = this.canvas.current;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#888";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.initializePossibleEdges();
        this.initializeDots();
    }

    initializeDots() {
        let ctx = this.canvas.current.getContext("2d");
        for (let [id, dot] of this.state.dots.entries()){
            if (!this.state.visitedDots.has(id)) {
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, 2 * Math.PI);
                ctx.fillStyle = "#000";
                ctx.fill();
                ctx.closePath();
            }
        }
    }

    initializePossibleEdges() {
        let ctx = this.canvas.current.getContext("2d");
        for (let edge of this.state.possibleEdges) {
                let dot1 = this.state.dots.get(edge.dot1),
                    dot2 = this.state.dots.get(edge.dot2)
                ctx.beginPath();
                ctx.moveTo(dot1.x, dot1.y);
                ctx.lineTo(dot2.x, dot2.y);
                ctx.lineWidth = 5;
                ctx.strokeStyle = "#666";
                ctx.stroke();
                ctx.closePath();
        }
    }

    getPosition(e) {
        const rect = this.canvas.current.getBoundingClientRect();
        return {x: e.clientX - rect.left, y: e.clientY - rect.top}
    }

    dotIsPressed(dot, mouseDown) {
        const a = DOT_RADIUS * 2,
              x = dot.x - mouseDown.x,
              y = dot.y - mouseDown.y;
        return a > Math.sqrt((x * x) + (y * y));
    }

    checkForDot = (e) => {
        let col = null;
        for (let [id, dot] of this.state.dots) {
            if (this.dotIsPressed(dot, this.getPosition(e))) {
                col = {id, dot};
                break;
            }
        }

        if (col !== null) {
            if (this.state.clickedDot !== null) {
                if (this.state.clickedDot.id !== col.id) {
                    if (this.state.visitedDots.has(col.id)) {
                        this.handleOpen("alreadyVisited");
                    } else if (!this.isValidEdge(this.state.clickedDot.id, col.id)) {
                        this.handleOpen("invalidEdge");
                    } else {
                        this.setState({
                            edgeToDraw: {drawn: false, dot1: this.state.clickedDot.dot, dot2: col.dot},
                            visitedDots: this.state.visitedDots.add(col.id),
                            clickedDot: col
                        })
                    }
                }
            } else {
                this.setState({
                    clickedDot: col,
                    visitedDots: this.state.visitedDots.add(col.id)
                })
            }
        } else {
            this.setState({
                clickedDot: null,
                edgeToDraw: null,
                visitedDots: new Set([])
            })
        }
        this.drawDots(e);
        console.log(this.state.clickedDot);
    }

    isValidEdge(id1, id2) {
        return this.state.possibleEdges.some(
            possibleEdge =>
                (possibleEdge.dot1 === id1 && possibleEdge.dot2 === id2) ||
                (possibleEdge.dot1 === id2 && possibleEdge.dot2 === id1));
    }

    drawDots = (e) => {
        let ctx = this.canvas.current.getContext("2d");
        const pos = this.getPosition(e);

        for (let [id, dot] of this.state.dots){
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, 2 * Math.PI);

            if (!this.state.visitedDots.has(id)) {
                ctx.fillStyle = ctx.isPointInPath(pos.x, pos.y) ? '#fff' : "#000";
            } else {
                ctx.fillStyle = '#fff';
            }

            ctx.fill();
            ctx.closePath();
        }
    }

    drawClickedDot() {
        let ctx = this.canvas.current.getContext("2d");
        if (this.state.clickedDot !== null) {
            let dot = this.state.clickedDot.dot;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.closePath();
        }
    }

    drawEdges() {
        let ctx = this.canvas.current.getContext("2d");
        let edge = this.state.edgeToDraw;

        if (edge === null) {
            this.initializeCanvas();
        } else if (!edge.drawn) {
            ctx.beginPath();
            ctx.moveTo(edge.dot1.x, edge.dot1.y);
            ctx.lineTo(edge.dot2.x, edge.dot2.y);
            ctx.lineWidth = 5;
            ctx.strokeStyle = "#fff";
            ctx.stroke();
            ctx.closePath();
            edge.drawn = true;
        }
    }

    checkAllDotsVisited() {
        if (!this.state.verified &&
                this.state.visitedDots.size === this.state.dots.size) {
            this.setState({
                verified: true
            })
        }
    }

    handleOpen(type) {
        if (this.state.openAlreadyVisitedError ||
                this.state.openInvalidEdgeError) {
            this.setState({
                openInvalidEdgeError: false,
                openAlreadyVisitedError: false
            })
        }

        switch (type) {
            case "alreadyVisited":
                this.setState({
                    openAlreadyVisitedError: true
                })
                break;
            case "invalidEdge":
                this.setState({
                    openInvalidEdgeError: true
                })
                break;
            default:
                break;
        }
    };

    render() {
        const res = window.devicePixelRatio || 1;

        return (
            <div>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    open={this.state.openAlreadyVisitedError}
                    message="You can only visit each dot once."
                    autoHideDuration={2000}
                    onClose={() => this.setState({openAlreadyVisitedError: false})}
                />
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    open={this.state.openInvalidEdgeError}
                    message="You can only follow the gray lines."
                    autoHideDuration={2000}
                    onClose={() => this.setState({openInvalidEdgeError: false})}
                />
                <canvas
                    ref={this.canvas}
                    width={window.innerWidth * res}
                    height={window.innerHeight * res}
                    onClick={this.checkForDot}
                    onMouseMove={this.drawDots}/>
            </div>
        );
    }
}

export default Page3;