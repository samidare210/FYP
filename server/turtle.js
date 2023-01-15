const rclnodejs = require('rclnodejs');

rclnodejs.init().then(() => {
    const node = new rclnodejs.Node("publisher");

    const publisher = node.createPublisher("test_msgs/msg/BasicTypes", "chatter");

    let count = 0;

    setInterval(() => {
        publisher.publish(Buffer.from("Hello ROS2 world."));
        console.log(`Publish ${count++} message.`);
    }, 1000);

    rclnodejs.spin(node);
});