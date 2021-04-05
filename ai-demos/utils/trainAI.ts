import * as tf from '@tensorflow/tfjs-node';

interface TrainingOptions {
	createModel: () => tf.Sequential;
	trainModel: ( model: tf.Sequential ) => Promise<{ loss: number }>;
	initialTrainingLossThreshold?: number;
	maxIterations?: number
	targetLoss?: number
}

export default async function trainAI( {
	createModel,
	trainModel,
	initialTrainingLossThreshold = 1,
	maxIterations = Infinity,
	targetLoss = 10 ** -5
}: TrainingOptions ) {
	let model: tf.Sequential;

	// Initial setting that should avoid local minimums.
	while ( true ) {
		model = createModel();
		const { loss } = await trainModel( model );
		const retry = loss >= initialTrainingLossThreshold;

		console.log( { loss, retry } );

		if ( !retry ) {
			break;
		}
	}

	// The actual training.
	let loss = Number.POSITIVE_INFINITY;
	let iteration = 0;

	while ( iteration < maxIterations && loss > targetLoss ) {
		loss = await ( await trainModel( model ) ).loss;
		iteration++;

		console.log( { iteration, loss } );
	}

	return model;
}
