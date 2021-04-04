import breeds from './breeds-data';
import * as tf from '@tensorflow/tfjs-node';

const samplesPerBreeds = 1000;

// const x = tf.tensor2d([[0, 0, 0, 1], [0, 0, 0, 1]]);
// const y = tf.tensor2d([[0.1, 0.8, 0.05, 0.05], [0.1, 0.05, 0.05, 0.8]]);
// const accuracy = tf.metrics.categoricalCrossentropy(x, y);
// accuracy.print();

const model = tf.sequential( {
	layers: [
		tf.layers.dense( {
			inputShape: [ 2 ],
			units: breeds.length * 2,
			activation: 'relu',
			kernelInitializer: 'varianceScaling',
			useBias: true
		} ),

		tf.layers.dense( {
			units: breeds.length,
			kernelInitializer: 'varianceScaling',
			useBias: false,
			activation: 'softmax'
		} )
	]
} );

model.compile( {
	optimizer: tf.train.adam( 0.05 ),
	loss: 'categoricalCrossentropy',
	metrics: [ tf.metrics.categoricalAccuracy ],
	
} );

( async () => {
	// Generate data for breeds.
	let breedsData = tf.tensor<tf.Rank.R2>( [], [ 0, 2 ] );
	let labels = tf.tensor<tf.Rank.R2>( [], [ 0, breeds.length ] );

	breeds.forEach( ( breed, index ) => {
		const weights = tf.randomUniform<tf.Rank.R2>( [ 1000, 1 ], breed.weight[ 0 ], breed.weight[ 1 ] );
		const heights = tf.randomUniform<tf.Rank.R2>( [ 1000, 1 ], breed.height[ 0 ], breed.height[ 1 ] );

		const breedData = tf.concat( [ weights, heights ], 1 );

		breedsData = breedsData.concat( [ breedData ], 0 );

		const label = Array.from<number>( { length: breeds.length } ).fill( 0 );
		label[ index ] = 1;

		const tLabel = tf.tensor<tf.Rank.R2>( Array.from<number[]>( { length: 1000 } ).fill( label ) );

		labels = labels.concat( [ tLabel ] );
	} );

	await model.fit( breedsData, labels, {
		epochs: 300,
		batchSize: 1000
	} );

	const input = tf.tensor( [
		[ 6, 8 ],
		[ 15, 10 ],
		[ 23, 15 ],
		[ 60, 17 ],
		[ 50, 10 ],
		[ 30, 20 ]
	] );

	const prediction = model.predict( input ) as tf.Tensor<tf.Rank>;

	console.log( round( await input.array() ) );
	console.log( round( await prediction.array() ) );
} )();

function round<T>( value: T ): T {
	if ( typeof value === 'number' ) {
		return ( value * 100 | 0 ) / 100 as any as T;
	}

	return ( value as any as number[] ).map( v => round( v ) ) as any as T;
}
