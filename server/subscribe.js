const rclnodejs = require('rclnodejs');

rclnodejs.init().then(() => {
    const node = rclnodejs.createNode("subscribe_example");

    node.createSubscription("std_msgs/msg/String", "topic", (msg) => {
        console.log(`Recievd message: ${typeof msg} `, msg);
    });

    rclnodejs.spin(node);
});