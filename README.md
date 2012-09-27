The SmartJs Realtime Mobile Application Framework
=======

SmartJs is an acronym that stands for

**S**OLID **M**VVM **A**MD **R**eal **T**ime **j**QueryMobile **S**PA

What's that mean?  [I have a website that attempts to explain it.](http://www.programico.com/smartjs.html)

Patterns and Practices
-------
* SPA - Single Page Application
* MVVM - Model View ViewModel
* Module - Independent components with no shims or globals
* SRP - Single Responsibility Principle
* OCP - Open/Closed Principle
* DI/IOC - Dependency Injection / Inversion of Control
* Pub/Sub - Publisher Subscriber pattern
* Virtual Pub/Sub - crosses device boundaries throughout connected system

Technologies
-------
* [Require Js](http://requirejs.org/) - implement AMD
* [Knockout Js](http://knockoutjs.com/) - implement MVVM
* [Jquery Mobile](http://jquerymobile.com/) with markup generated by [Codiqa UI](http://www.codiqa.com/) - implement SPA
* [nowjs](http://nowjs.com/) running inside [Node.js](http://nodejs.org/) - implement realtime webserver
* [mongoDB](http://www.mongodb.org/) with the [node-mongodb-native](https://github.com/mongodb/node-mongodb-native) driver - implement persistence
* [Cordova/Phonegap](http://phonegap.com/) - target 99% devices
* [Lodash](http://lodash.com/) - implement model projections
* [Jasmine](http://pivotal.github.com/jasmine/) - implement Unit Testing

Demo App Features
-------
* Realtime chatrooms
* Dynamic memberlist
* Persistent topics
* Realtime feedback on chat room member list
* Event based: Client to Server, Server to Client, Client to Client, Client to Group, Server to Group
* Segregate network traffic into subscriber groups
* Virtual event pub/sub
* Queueing network events in case of latency/unavailability of server
* Persistent local device member
* Implement 100% height jQuery mobile view as Amd module
* Implement Js "Schema" module to prevent fragmentation of data model
* Implement naming conventions to reliably identify dependencies
* Client can connect to a different Server technology with 1 file change
* Narrow Client/Server interface consisting of only 2 extensible functions, implements OCP
* Knockout binding helper to keep jQueryMobile listview refreshed, separates View concerns from ViewModel
* Facade pattern for improved Pubsub traffic logging
* Facade pattern for intuitive localStorage interface
* Facade pattern for logging to console if config.isTest
* Enterprise ready starter project, easy to customize or build upon
* Free license, anybody can use and contribute

Todo
-------
* Security - Oath
* Social - Implement Hackbook as AMD module
* Improve validation
* Improve UI
* Demonstrate Client to Client PM feature
* Demonstrate Phonegap API around a device feature, probaby camera, so implement chat room picture feature
* More unit testing
* 
See the full [TODO.md](./smartjs/blob/master/planning/TODO.md) checked into the github project