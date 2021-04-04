import * as tf from '@tensorflow/tfjs-node';

const model = tf.sequential( {
	layers: [
		tf.layers.dense( {
			inputShape: [ 1 ],
			units: 4,
			activation: 'relu',
			kernelInitializer: 'varianceScaling',
			useBias: true
		} ),

		tf.layers.dense( {
			units: 2,
			kernelInitializer: 'varianceScaling',
			useBias: false,
			activation: 'softmax'
		} )
	]
} );

model.compile( {
	optimizer: tf.train.adam( 0.1 ),
	loss: 'categoricalCrossentropy',
	metrics: [ tf.metrics.binaryAccuracy ]
} );

( async () => {
	const inputSampleData = tf.randomUniform( [ 20000, 1 ], -1, 1 );
	const data = await inputSampleData.array() as number[][];
	const expectedOutput = data.map( x => x[ 0 ] > 0 ? [ 1, 0 ] : [ 0, 1 ] );
	const expectedResults = tf.tensor( expectedOutput, [ 20000, 2 ] );

	const info = await model.fit( inputSampleData, expectedResults, {
		epochs: 30,
		batchSize: 1000
	} );

	console.log( 'Final accuracy', info.history );

	const input = tf.tensor( [ -1, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1 ], [ 21, 1 ] );

	const prediction = model.predict( input ) as tf.Tensor<tf.Rank>;

	console.log( await input.array() );
	console.log( await prediction.array() );
} )();
