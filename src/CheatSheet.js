import React from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';

export default function CheatSheet() {
    return (
        <div id={'CheatSheet'}>
            <Typography variant="h5">Cheat Sheet</Typography>
            <Typography variant="h6">Data Types</Typography>
            <p>
            Computers are pretty amazing; they can work with many types of data, like
            strings (text), integers (numbers), and objects. For now, we'll only need
            two of them: strings and integers.
            </p>
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
            An <b>integer</b> is just any whole number (without decimals). We don't need 
            quotation marks for these. Here are some integers:
            <br/><br/>
            <code>34</code><code>0</code><code>-14875</code>
            </p>
            <br/>
            <br/>
            <Typography variant="h6">Variables</Typography>
            <p>
            A <b>variable</b> is a tiny piece of computer memory that can store data,
            like how variables can store numbers in math! We can create variables to
            use in our code. Below, we create a variable by using <code>=</code> sign.
            <br/><br/>
            <code>x = 5</code>
            <br/><br/>
            The variable is called <code>x</code> and stores the integer 5. We can
            name variables anything we want, but each variable name must be unique. 
            <div className='blockText'>
                BEWARE! In code, don't read <code>=</code> as "equals"; read it as
                the word <b>"stores"</b>. Why? Because we also use <code>=</code>
                to <i>change</i> a variable's value, which you'll see shortly.
                <br/><br/>
                For example, consider the statement <code>letters = "abc"</code>.
                <br/>
                This reads: the variable <code>letters</code> <b>stores</b> the string "abc".
            </div>
            You can also change the value of variables in the same way:
            <br/><br/>
            <code>x = 6</code>
            <br/><br/>
            Now, <code>x</code> no longer stores 5 -- it stores 6! We can also do this:
            <br/><br/>
            <code>x = x + 5</code>
            <br/><br/>
            <code>x</code> now stores 11 because 6 + 5 equals 11.
            <br/>
            </p>
        </div>
    )
}