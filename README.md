# Curvy Pong with Ball Trail & Smooth Paddles

A starter project for a basic pong game using SVGs.

## Stretch Goals

### Curve Balls
This was a big challenge and required applying some grade 10 trigonometry and a basic understanding of the unit circle to complete. The biggest issed was calculating bounces and sending the ball in the opposite directions after hitting a wall by multiplying the x or y by -1 or by adding Math.PI to theta, instead of simply setting velocity.x *=  -1.

#### How it works
The ball has a speed, direction (theta), and a spin speed. Every frame theta gets adjusted by an amount depending on the spin speed. The spin speed increases when the ball hits the paddle and the spin speed added depends on the speed of the paddle that hit it. Every frame the spin speed decreases to simulate air friction so that theta will eventually not be adjusted meaning that the ball is going in a straight line. The x velocity is equal to cos(theta) while the y velocity is equal to sin(theta).

### Ball Trail

This was done by creating a circle based on the current position of the ball and adding it to an array and then shifting and pushing the static elements of the array to create a line of circles. I also made the trail shorter on the end so it would look kind of like a fireball of comet by adjusting the size of the radius by a decreasing amount.

### Smooth Paddles

When a key is pressed to move the paddles, instead of moving the paddles I add force to the current speed of the paddle. The paddle moves every frame based on the speed so it is able to speed up and slow down over time smoothly. A big challenge with this was preventing the paddles from being shoved up and out of the game. This was fixed by only detecting key presses up or down if the paddle is not against the edge already. The paddles also slow down every frame to 0 to simulate frictions. The paddles also bounce off of the edges and their speed gets reduced from the impact simulating an imperfect transfer of energy like in real life.
