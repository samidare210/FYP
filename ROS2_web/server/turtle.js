const rclnodejs = require('rclnodejs');
const geometry_msgs = rclnodejs.require('geometry_msgs').msg;

async function main() {
    // create a new node
    const node = rclnodejs.createNode('turtlebot3_teleop');

    // create a publisher for cmd_vel
    const cmd_vel_pub = node.createPublisher(geometry_msgs.Twist, 'cmd_vel');

    // create a subscription for the keyboard input
    node.createSubscription('std_msgs/String', 'keyboard', (msg) => {
        // create a new Twist message
        const twist = new geometry_msgs.Twist();
        if (msg.data === 'w') {
            twist.linear.x = 0.2;
        } else if (msg.data === 's') {
            twist.linear.x = -0.2;
        } else if (msg.data === 'a') {
            twist.angular.z = 0.2;
        } else if (msg.data === 'd') {
            twist.angular.z = -0.2;
        }
        // publish the Twist message
        cmd_vel_pub.publish(twist);
    });
    // spin the node
    await rclnodejs.spin(node);
    // shutdown the node
    rclnodejs.shutdown();
}

main();