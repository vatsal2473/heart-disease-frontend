import React, { useState } from 'react';

import './App.css';


function App() {

  const [formData, setFormData] = useState({

    age: '',

    sex: '',

    cp: '',

    trestbps: '',

    chol: '',

    fbs: '',

    restecg: '',

    thalach: '',

    exang: '',

    oldpeak: '',

    slope: '',

    ca: '',

    thal: '',

  });


  const [prediction, setPrediction] = useState('');


  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    let formdata = new FormData();

    for (const key in formData) {

      formdata.append(key, formData[key]);

    }


    const requestOptions = {

      method: 'POST',

      body: formdata,

      redirect: 'follow',

    };


    try {

      const response = await fetch(

        'https://heart-disease-api-production.up.railway.app/predict',

        requestOptions,

      );

      const result = await response.text();

      setPrediction(result);

    } catch (error) {

      console.log('error', error);

    }

  };


  return (

    <div className="App">

      <h1>Heart Disease Predictor</h1>

      <form onSubmit={handleSubmit}>

        {Object.keys(formData).map((key) => (

          <div key={key}>

            <label htmlFor={key}>{key}:</label>

            <input

              type="text"

              name={key}

              id={key}

              value={formData[key]}

              onChange={handleChange}

            />

          </div>

        ))}

        <button type="submit">Predict</button>

      </form>

      {prediction && (

        <div className="prediction">

          Prediction: {prediction}

        </div>

      )}

    </div>

  );

}


export default App;