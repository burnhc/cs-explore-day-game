import {DialogContent} from "@material-ui/core";

const NotePuzzle = () => {
    return (
        <DialogContent id={'note'}>
            <p>
                three = "World"<br/>
                world = "Hello"<br/>
                hello = "3"<br/>
                Password = world + three + hello
            </p>
        </DialogContent>
    );
}

export default NotePuzzle;