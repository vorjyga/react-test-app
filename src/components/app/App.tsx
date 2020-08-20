import React from 'react';
import './App.css';
import Form from "../form/form";
import ResultWindow from "../resultWindow/resultWindow";

const App: React.FC = () => {
    return (
        <div className="App">
            <Form />
            <ResultWindow />
        </div >
    );
}

export default App;
