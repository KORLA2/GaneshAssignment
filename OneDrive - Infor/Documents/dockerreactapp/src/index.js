import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import * as AWS from 'aws-sdk'
const configuration={
    region: 'ap-south-1',
    secretAccessKey: 'LsW4H+WrEhGtqpGQl5Y3mJgA2Vq13TmIEUL7bmcu',
    accessKeyId: 'AKIA2GYDJWWEBZ3NEMJA',
}

AWS.config.update(configuration)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<>
<App/>
</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
