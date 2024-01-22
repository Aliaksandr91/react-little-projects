import React, {useEffect, useRef, useState} from 'react';
import {Block} from './Block';
import './index.scss';

interface Rates {
    [key: string]: number;
}

function App() {

    const [fromCurrency, setFromCurrency] = useState('PLN')
    const [toCurrency, setToCurrency] = useState('USD')
    const [fromPrice, setFromPrice] = useState(0)
    const [toPrice, setToPrice] = useState(1)

    const ratesRef = useRef<Rates>({})

    useEffect(() => {
        fetch('https://open.er-api.com/v6/latest/USD')
            .then(res => res.json())
            .then(json => {
                ratesRef.current = json.rates
                onChangeToPrice(1)
            })
            .catch(err => console.log(err))
    }, [])

    const onChangeFromPrice = (value: number) => {
        const price = value / ratesRef.current[fromCurrency]
        const result = price * ratesRef.current[toCurrency]
        setToPrice(parseFloat(result.toFixed(3)));
        setFromPrice(value)
    }
    const onChangeToPrice = (value: number) => {
        const result = ratesRef.current[fromCurrency] / ratesRef.current[toCurrency] * value
        setFromPrice(parseFloat(result.toFixed(3)));
        setToPrice(value)
    }
    useEffect(() => {
        onChangeFromPrice(fromPrice)
    }, [fromCurrency])
    useEffect(() => {
        onChangeToPrice(toPrice)
    }, [toCurrency])

    return (
        <div className="App">
            <Block
                value={fromPrice}
                currency={fromCurrency}
                onChangeCurrency={setFromCurrency}
                onChangeValue={onChangeFromPrice}
            />
            <Block
                value={toPrice}
                currency={toCurrency}
                onChangeCurrency={setToCurrency}
                onChangeValue={onChangeToPrice}
            />
        </div>
    );
}

export default App;