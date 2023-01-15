const rclnodejs = require('rclnodejs');
const http = require('http');
const express = require('express');

rclnodejs.init().then(() => {
    const node = new rclnodejs.Node("publisher_example_node");
    const publisher = node.createPublisher("std_msgs/msg/String", "topic");
    publisher.publish("hello");

    node.spin(); 
});