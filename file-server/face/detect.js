require('@tensorflow/tfjs-node');
const {faceDetectionNet,
    faceDetectionOptions,
    canvas,
    faceapi,
} = require('./setup-face');
const path = require('path')

const { determineExpression, saveEditedImage} = require('../utils/face-utils'); 

const detect = async (imagePath) =>{
	// Use path from root directory perspective
    await faceDetectionNet.loadFromDisk('./face/weights');
    await faceapi.nets.faceLandmark68Net.loadFromDisk('./face/weights');
    await faceapi.nets.faceExpressionNet.loadFromDisk('./face/weights');
    await faceapi.nets.ageGenderNet.loadFromDisk('./face/weights');

    const img = await canvas.loadImage(imagePath)

    const detectExpressions = await faceapi.detectAllFaces(img, faceDetectionOptions)
      .withFaceLandmarks()
      .withFaceExpressions()
		
		const detectAgeAndGender = await faceapi.detectAllFaces(img, faceDetectionOptions)
      .withFaceLandmarks()
      .withAgeAndGender()

		const faceCount = detectExpressions.length;

		console.log(faceCount, "face count")

		const faceData = [];

		for (let i = 0; i < faceCount; i++){
			const expressionPredictions = detectExpressions[i].expressions;
			const expression = determineExpression(expressionPredictions);

			const { age, gender, genderProbability } = detectAgeAndGender[0];

			faceData.push({
				age,
				gender,
				genderProbability,
				expression
			})
		}

		return {
			faceDetected: faceCount > 0 ? true : false,
			faceData,
			faceCount
		}
}

const run = async () =>{
	console.log(await detect('../images/jet.jpg'))
}

module.exports = detect;
