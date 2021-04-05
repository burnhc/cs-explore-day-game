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
                [[1, {x: 26, y: 240}], [2, {x: 325, y: 18}],
                    [3, {x: 627, y: 240}], [4, {x: 513, y: 592}],
                    [5, {x: 137, y: 592}], [6, {x: 120, y: 268}],
                    [7, {x: 240, y: 210}], [8, {x: 323, y: 117}],
                    [9, {x: 414, y: 213}], [10, {x: 532, y: 269}],
                    [11, {x: 468, y: 387}], [12, {x: 452, y: 511}],
                    [13, {x: 323, y: 487}], [14, {x: 196, y: 511}],
                    [15, {x: 179, y: 379}], [16, {x: 276, y: 263}],
                    [17, {x: 376, y: 263}], [18, {x: 408, y: 363}],
                    [19, {x: 322, y: 424}], [20, {x: 239, y: 361}]]),
            possibleEdges:
                [{dot1: 1, dot2: 2}, {dot1: 2, dot2: 3},
                    {dot1: 3, dot2: 4}, {dot1: 4, dot2: 5},
                    {dot1: 5, dot2: 1}, {dot1: 6, dot2: 7},
                    {dot1: 7, dot2: 8}, {dot1: 8, dot2: 9},
                    {dot1: 9, dot2: 10}, {dot1: 10, dot2: 11},
                    {dot1: 11, dot2: 12}, {dot1: 12, dot2: 13},
                    {dot1: 13, dot2: 14}, {dot1: 14, dot2: 15},
                    {dot1: 15, dot2: 6}, {dot1: 16, dot2: 17},
                    {dot1: 17, dot2: 18}, {dot1: 18, dot2: 19},
                    {dot1: 19, dot2: 20}, {dot1: 1, dot2: 6},
                    {dot1: 2, dot2: 8}, {dot1: 3, dot2: 10},
                    {dot1: 4, dot2: 12}, {dot1: 5, dot2: 14},
                    {dot1: 7, dot2: 16}, {dot1: 9, dot2: 17},
                    {dot1: 11, dot2: 18}, {dot1: 13, dot2: 19},
                    {dot1: 15, dot2: 20}, {dot1: 20, dot2: 16}],
            visitedDots: this.props.solvedGraphDots,
            edgesDrawn: this.props.solvedGraphEdges,
            edgeToDraw: null,
            openAlreadyVisitedError: false,
            openInvalidEdgeError: false,
            verified: this.props.puzzleSolved
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
        ctx.fillStyle = "#200081";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.initializePossibleEdges();
        this.initializeDots();
    }

    initializeDots() {
        let ctx = this.canvas.current.getContext("2d");
        for (let [id, dot] of this.state.dots.entries()) {
            if (!this.state.visitedDots.has(id)) {
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, 2 * Math.PI);
                ctx.fillStyle = "#4102ff";
                ctx.fill();
                ctx.closePath();
            } else if (this.state.verified) {
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, 2 * Math.PI);
                ctx.fillStyle = "#fff";
                ctx.fill();
                ctx.closePath();
            }
        }
    }

    initializePossibleEdges() {
        let ctx = this.canvas.current.getContext("2d");
        for (let edge of this.state.possibleEdges) {
            let dot1 = this.state.dots.get(edge.dot1),
                dot2 = this.state.dots.get(edge.dot2);
            ctx.beginPath();
            ctx.moveTo(dot1.x, dot1.y);
            ctx.lineTo(dot2.x, dot2.y);
            ctx.lineWidth = 5;
            ctx.strokeStyle = "#4102ff";
            ctx.stroke();
            ctx.closePath();
        }

        if (this.state.edgesDrawn.size !== 0 && this.state.verified) {
            for (let edge of this.state.edgesDrawn.values()) {
                ctx.beginPath();
                ctx.moveTo(edge.dot1.x, edge.dot1.y);
                ctx.lineTo(edge.dot2.x, edge.dot2.y);
                ctx.lineWidth = 5;
                ctx.strokeStyle = "#fff";
                ctx.stroke();
                ctx.closePath();
            }
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
                visitedDots: new Set([]),
                edgesDrawn: new Set([])
            })
        }
        this.drawDots(e);
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

        for (let [id, dot] of this.state.dots) {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, 2 * Math.PI);

            if (!this.state.visitedDots.has(id)) {
                ctx.fillStyle = ctx.isPointInPath(pos.x, pos.y) ? '#fff' : "#4102ff";
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
            this.state.edgesDrawn.add(edge);
            console.log(this.state.edgesDrawn);
        }
    }

    checkAllDotsVisited() {
        if (!this.state.verified &&
            this.state.visitedDots.size === this.state.dots.size) {
            this.props.puzzle();
            this.props.storeGraphState(this.state.visitedDots, this.state.edgesDrawn);
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
        return (
            <div>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    open={this.state.openAlreadyVisitedError}
                    message="You can only visit each dot once."
                    autoHideDuration={2000}
                    onClose={() => this.setState({openAlreadyVisitedError: false})}
                />
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    open={this.state.openInvalidEdgeError}
                    message="Oops, you can't connect these two dots."
                    autoHideDuration={2000}
                    onClose={() => this.setState({openInvalidEdgeError: false})}
                />
                <canvas
                    id={'graph'}
                    ref={this.canvas}
                    width={960}
                    height={800}
                    onClick={!this.state.verified ? this.checkForDot : null}
                    onMouseMove={!this.state.verified ? this.drawDots : null}/>
            </div>
        );
    }
}

export default Page3;