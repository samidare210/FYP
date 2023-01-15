const rclnodejs = require('rclnodejs');

rclnodejs.init().then(() => {
    const node = rclnodejs.createNode("publisher");
    const publisher = node.createPublisher("std_msgs/msg/String", "topic");
    publisher.publish(`Hello ROS2 from rclnodejs`);
    rclnodejs.spin(node);
});

