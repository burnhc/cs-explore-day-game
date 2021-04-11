import React, {Component} from 'react';
import "./App.css";
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

const DOT_RADIUS = 10;

class GraphPuzzle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedDot: null,
            dots: new Map(
                [[1, {x: 26 * 0.7, y: 240 * 0.7}], [2, {x: 325 * 0.7, y: 18 * 0.7}],
                    [3, {x: 627 * 0.7, y: 240 * 0.7}], [4, {x: 513 * 0.7, y: 592 * 0.7}],
                    [5, {x: 137 * 0.7, y: 592 * 0.7}], [6, {x: 120 * 0.7, y: 268 * 0.7}],
                    [7, {x: 240 * 0.7, y: 210 * 0.7}], [8, {x: 323 * 0.7, y: 117 * 0.7}],
                    [9, {x: 414 * 0.7, y: 213 * 0.7}], [10, {x: 532 * 0.7, y: 269 * 0.7}],
                    [11, {x: 468 * 0.7, y: 387 * 0.7}], [12, {x: 452 * 0.7, y: 511 * 0.7}],
                    [13, {x: 323 * 0.7, y: 487 * 0.7}], [14, {x: 196 * 0.7, y: 511 * 0.7}],
                    [15, {x: 179 * 0.7, y: 379 * 0.7}], [16, {x: 276 * 0.7, y: 263 * 0.7}],
                    [17, {x: 376 * 0.7, y: 263 * 0.7}], [18, {x: 408 * 0.7, y: 363 * 0.7}],
                    [19, {x: 322 * 0.7, y: 424 * 0.7}], [20, {x: 239 * 0.7, y: 361 * 0.7}]]),
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
        // weird hack bc visitedDots wasn't resetting on unmount for some reason
        if (!this.state.verified && this.state.visitedDots.size !== 0) {
            this.setState({
                visitedDots: new Set([])
            })
        }
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
        ctx.fillStyle = "#4F4659";
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
                ctx.fillStyle = "#6c5f7a";
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
            ctx.strokeStyle = "#6c5f7a";
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
                ctx.fillStyle = ctx.isPointInPath(pos.x, pos.y) ? '#fff' : "#6c5f7a";
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
            <div id={'graph'}>
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
                    id={"graph-canvas"}
                    ref={this.canvas}
                    width={460}
                    height={440}
                    onClick={!this.state.verified ? this.checkForDot : null}
                    onMouseMove={!this.state.verified ? this.drawDots : null}/>
                    <div id={'graph-desc'}>
                        <Typography>
                            <p>
                                Given these dots connected by lines, can we trace a path that touches
                                all of the dots, but that takes each line only once?
                            </p>
                            <p>
                                This might seem straightforward to accomplish. But believe it or not, this
                                is currently one of the most difficult problems to have a computer solve! It's
                                known famously as the "Hamiltonian Path" problem, named after mathematician
                                William Rowan Hamilton who came up with the puzzle in 1857.
                            </p>
                            <p>
                                What makes this problem so complicated is that there are many different paths
                                a computer would have to try. To be exact, the puzzle on the left has a whopping
                                <b> 2.6525286 * 10<sup>32 </sup></b> permutations for a computer to check, which
                                would take a very long time!
                            </p>
                        </Typography>
                    </div>
            </div>
        );
    }
}

export default GraphPuzzle;