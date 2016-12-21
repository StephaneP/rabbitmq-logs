const connection = require('amqp').createConnection(
	{host: process.env.AMQP || 'localhost'}
);

connection.on('ready', () => {
	var queue = connection.queue('', (queue) => {
		console.log(`connected to ${queue.name}`);
		queue.bind('amq.rabbitmq.log', '#');

		queue.subscribe((message, headers, deliveryInfo) => {
			console.log(`[${deliveryInfo.routingKey}] ${message.data.toString()}`);
		});
	});
});
