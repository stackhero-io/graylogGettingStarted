# Graylog / Node.js

This is a simple example of how to use Graylog in a few minutes.


## Create Graylog input

First, you have to create an input in Graylog.

Go to your Graylog interface, in `System`, `Inputs`. In `Select input`, choose the `GELF UDP` one.

Set the title to "GELF UDP" and valid it.


GELF means "Graylog Extended Log Format". It was created by Graylog and is perfect for this example and probably for your needs.


## Run this example

- Clone this repository: `git clone https://github.com/stackhero-io/graylogGettingStarted.git && cd graylogGettingStarted`
- Go to the Node.js code example: `cd nodejs`
- Then, install nodes packages: `npm install`
- Finally, start the example: `node app.js`

Then you can now explore the file `app.js`, modify it and test it :)


That's it, you're ready to log everything!