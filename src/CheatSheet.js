import React from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';

export default function CheatSheet() {
    return (
        <div id={'CheatSheet'}>
            <Typography variant="h5">Cheat Sheet</Typography>
            <Typography variant="h6">Data Types</Typography>
            <Typography variant="button">Strings</Typography>
            <p>
            A <b>string</b> is a group of characters on your keyboard. Your computer recognizes
            strings when we enclose characters with quotation marks "like this". Spaces are also
            considered characters. Here are some strings: 
            <br/><br/>
            <code>"hello"</code><code>"h-3-l-l-0"</code><code>"hE  lLO"</code>
            </p>
            <Typography variant="button">Integers</Typography>
            <p>
            An <b>integer</b> is just any whole number (without decimals). Numbers are written
            without quotation marks. Here are some integers:
            <br/><br/>
            <code>34</code><code>0</code><code>-14875</code>
            </p>
            <br/>
            <br/>
            <Typography variant="h6">Variables</Typography>
            <p>
            A <b>variable</b> is a tiny piece of computer memory that can store data,
            like how variables can store numbers in math! Below, we create a variable by using <code>=</code> sign.
            <br/><br/>
            <code>x = 5</code>
            <br/><br/>
            The variable is called <code>x</code> and stores the integer 5. You can
            name variables anything you want, but each variable name must be unique. 
            You can also change the value of variables in the same way:
            <br/><br/>
            <code>x = 6</code>
            <br/><br/>
            Now, <code>x</code> no longer stores 5 -- it stores 6! You can also do this:
            <br/><br/>
            <code>x = x + 5</code>
            <br/><br/>
            <code>x</code> now stores 11 because 6 + 5 equals 11.
            <br/>
            </p>
        </div>
    )
}