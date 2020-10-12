# Boids
Implementation of Boids


Cohesion:

For all boids within a given range of a specific boid, find the average location. Add all the postion vectors and divide by the number of boids in the
given range. The calculated vector will begin at the leftmost corner and end at the average position. Then find the vector from the current boids position to the average position. Scale the vector to dampen the effect and add it to the current boid's direction.
