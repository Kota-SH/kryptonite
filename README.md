# kryptonite
A deep dive into the world of Microservices (my kryptonite) - Node, React, Express JS, Docker, Kubernetes, CI/CD, NATS

## What is a micro service?
A micro service contains - Routing, Middlewares, Business logic and Database access to implement one single feature of the app.
A monolith has above services common for all features.

## Challenges
### 1. Data Management
1. Each service as a separate database
2. Services will never try to access database of another service i.e. Database per service
#### But why??
1. We want each service to run independently
2. Schema might change
3. Some services are better suited with different kinds of databases like NoSQL

## Sync between servers
There are two ways of communication - synchronous vs asynchronous

## Synchronous Communication
Services communicate with each other with direct request (http, exchange json etc.)

Advantages: 
    1. Simple to understand.
    2. New services do not need a database.
Disadvantages:
    1. Increased dependency on the other services.
    2. If inter-service request fails, overall request fails.
    3. Entire request is only as fast as the slowest request.
    4. Can introduce a web of dependencies.

## Asynchronous Communication
Services communicate with each other via an event bus.
- Refine the goal of the service.
- Add a database to the new service as per the data needs of the service.
- Populate the db by pushing and receiving events from the event bus as they happen.

Advantages: 
    1. Services will be fast.
    2. New services will have no dependencies on other services.
Disadvantages:
    1. Data duplication.
    2. Harder to understand.

## Project So far
Goal: Implement a React-ExpressJS blog application.
Implemented services: client, posts, comments, query, eventbus, moderation
Problems handled: CORS, Missing events using Eveny sync mechanism





