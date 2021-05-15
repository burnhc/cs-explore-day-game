import React from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';

export default function CheatSheet() {
    return (
        <div id={'CheatSheet'}>
            <Typography variant="h5">Cheat Sheet</Typography>
            <br/>
            <br/>
            <Typography variant="h6">Data Types</Typography>
            <br/>
            <Typography variant="button">Strings</Typography>
            <p>
            A <b>string</b> is a group of characters on your keyboard. We enclose strings
            with quotation marks "like this". Spaces are also characters. Here are some strings: 
            <br/><br/>
            <code>"hello"</code><code>"h-3-l-l-0"</code><code>"hE  lLO"</code>
            Strings can be joined (concatenated) together with <code>+</code>.
            <br/><br/>
            <code>"abc" + "123"</code> becomes the string <code>"abc123"</code>
            </p>
            <br/>
            <Typography variant="button">Integers</Typography>
            <p>
            An <b>integer</b> is just any whole number. Numbers are written
            without quotation marks. Here are some integers:
            <br/><br/>
            <code>34</code><code>0</code><code>-14875</code>
            <br/><br/>
            We can perform basic math operations on them like <code>+, -, *, /</code>. We can
            also compare integers using <code>{`>, <, <=, >=, ==`}</code>.
            </p>
            <code>34 + 1</code> evaluates to <code>35</code>.
            <br/>
            <code>{`1 < 1`}</code> evaluates to false because 1 is <b>not</b> less than 1.
            <br/>
            <code>{`1 <= 1`}</code> evaluates to true because 1 is less than <b>or equal to</b> 1.
            <br/>
            <code>-175 == 4</code> evalutes to false because -175 is <b>not</b> equivalent to 4.
            <br/><br/>
            <br/>
            <br/>
            <Typography variant="h6">Variables</Typography>
            <p>
            A <b>variable</b> stores data, like how variables can store numbers in math. We declare a variable by using <code>=</code> sign.
            <br/><br/>
            <code>x = 5</code>
            <br/><br/>
            Here, the variable is called <code>x</code> and stores the integer 5. You can
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
            <br/>
            <br/>
            <br/>
            <Typography variant="h6">Functions</Typography>
            <p>A function is a group of code that performs a single action. Like functions in math, they can
                accept arguments and perform actions with them. A built-in function is called <code>print()</code>
                that prints its argument to the console. Let's print the string <code>"Hello World"</code>.</p>
            <code>print("Hello World")</code>
            <p>You can define your own function using the <code>def</code> keyword,
             followed by the function name and its arguments. Then, we can call it!</p>
            <p className={'blockText'}>{`# Here's a function that prints x + y \ndef add(x, y):\n   print(x + y)\n\n# Now, we call the function with 1 and 2\nadd(1, 2)`}</p>
            <br/><br/>
            <Typography variant="h6">Loops</Typography>
            <p>A loop repeats a certain block of code multiple times. <code>range(n)</code> specifies how many times we
            want the code to repeat. It starts at 0 and ends at n - 1. Try this code out:</p>
            <p className={'blockText'}>{`for i in range(10):\n   print(i)`}</p>
            <br/><br/>
            <Typography variant="h6">Conditionals</Typography>
            <p>We can control what code gets run based on a condition. The <code>if</code> condition
            gets checked first. If the condition is true, we execute the first branch. If it's false, we skip
            the first branch and execute the <code>else</code> branch, instead.</p>
            <p className={'blockText'}>{`x = 0\n\nif x == 0:
    print("x is 0")
else:
    print("x is not 0")`}</p>
            <p>The code above will print <code>"x is 0"</code> since the condition <code>x == 0</code> is true!</p>
            </p>
        </div>
    )
}