import * as tf from '@tensorflow/tfjs-node';
import breeds from './breeds-data';
import trainAI from './utils/trainAI';

const samplesPerBreeds = 1024;

( async () => {
	const model = await trainAI( {
		createModel,
		trainModel,
	} );

	await validate( model );
} )();

function createModel() {
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
		metrics: [ tf.metrics.categoricalAccuracy ]
	} );

	return model;
}

async function trainModel( model: tf.Sequential ) {
	// Generate data for breeds.
	let breedsData = tf.tensor<tf.Rank.R2>( [], [ 0, 2 ] );
	let labels = tf.tensor<tf.Rank.R2>( [], [ 0, breeds.length ] );

	breeds.forEach( ( breed, index ) => {
		const weights = tf.randomUniform<tf.Rank.R2>( [ samplesPerBreeds, 1 ], breed.weight[ 0 ], breed.weight[ 1 ] );
		const heights = tf.randomUniform<tf.Rank.R2>( [ samplesPerBreeds, 1 ], breed.height[ 0 ], breed.height[ 1 ] );

		const breedData = tf.concat( [ weights, heights ], 1 );

		breedsData = breedsData.concat( [ breedData ], 0 );

		const label = Array.from<number>( { length: breeds.length } ).fill( 0 );
		label[ index ] = 1;

		const tLabel = tf.tensor<tf.Rank.R2>( Array.from<number[]>( { length: samplesPerBreeds } ).fill( label ) );

		labels = labels.concat( [ tLabel ] );
	} );

	const result = await model.fit( breedsData, labels, {
		epochs: 10,
		shuffle: true,
		batchSize: 256,
		verbose: 0
	} );

	const losses = result.history.loss as number[];

	return {
		loss: losses[ losses.length - 1 ]
	}
}

async function validate( model: tf.Sequential ) {
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
}

function round<T>( value: T, magnitude = 5 ): T {
	if ( typeof value === 'number' ) {
		return ( value * 10 ** magnitude | 0 ) / 10 ** magnitude as any as T;
	}

	return ( value as any as number[] ).map( v => round( v, magnitude ) ) as any as T;
}
