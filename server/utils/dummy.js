// import pickle
// from flask import Flask, request, jsonify

// # Load the saved model
// with open('model.pkl', 'rb') as f:
//     model = pickle.load(f)

// # Create a Flask app
// app = Flask(__name__)

// # Define a route to serve predictions
// @app.route('/predict', methods=['POST'])
// def predict():
//     # Parse the request data
//     data = request.get_json()

//     # Make predictions using the loaded model
//     predictions = model.predict(data)

//     # Return the predictions as a JSON response
//     return jsonify(predictions.tolist())

// if __name__ == '__main__':
//     app.run(debug=True)


// const axios = require('axios');

// // Make a POST request to the Python API endpoint
// axios.post('http://localhost:5000/predict', { data: [1, 2, 3] })
//   .then(function (response) {
//     // Handle the response returned by the Python API endpoint
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
