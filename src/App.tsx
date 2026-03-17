import React from 'react';
import './App.css';
import { Counter } from './components/Counter';
import { Button } from './components/Button';
import { Label } from "./components/Label";
import { Input } from "./components/Input"
import { useState } from 'react';
import { ChangeEvent } from 'react';

export const App = () => {
  const defaultStartValue = 0
  const defaultMaxValue = 1
  const deltaValue = 1


  const [counterStartValue, setCounterStartValue] = useState<number>(defaultStartValue)
  const [counterMaxValue, setCounterMaxValue] = useState<number>(defaultMaxValue)
  const [Value, setValue] = useState<number>(counterStartValue)
  const [inputStartValue, setInputStartValue] = useState<number>(defaultStartValue)
  const [inputMaxValue, setInputMaxValue] = useState<number>(defaultMaxValue)
  const isIncorrectValue = inputStartValue < 0 || inputMaxValue <= inputStartValue
  const isPendingSet = !isIncorrectValue && (inputStartValue !== counterStartValue || inputMaxValue !== counterMaxValue)
  const isSetDisabled = isIncorrectValue || !isPendingSet
  const displayValue = isIncorrectValue ? "Incorrect value!" : isPendingSet ? "Enter values and press set" : Value



  const onClickIncHandler = () => {
    if (Value < counterMaxValue) {
      setValue (Value + deltaValue)
    }
  }

  const onClickResetHandler = () => {
    setValue (counterStartValue)
  }

  const onClickSetHandler = () => {
    if (!isIncorrectValue) {
      setCounterStartValue(inputStartValue)
      setCounterMaxValue(inputMaxValue)
      setValue(inputStartValue)
    }
  }

  const onChangeInputMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newInputMaxValue = Number(e.target.value);
    setInputMaxValue(newInputMaxValue);
  }

  const onChangeInputStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newInputStartValue = Number(e.target.value);
    setInputStartValue(newInputStartValue);
  }




  return (
    <div className="App">

      <div className = {"settings-wrapper"}>
        <div className = {"input-wrapper"}>
          <Label title = {"max value:"} className = {"label-style"}/>
          <Input inputValue = {inputMaxValue} className = {`input-style ${inputMaxValue <= inputStartValue ? "input-error" : ""}`} onChange = {onChangeInputMaxValueHandler}/>
        </div>
        <div className = {"input-wrapper"}>
          <Label title = {"start value:"} className = {"label-style"}/>
          <Input inputValue = {inputStartValue} className = {`input-style ${inputStartValue < 0 || inputMaxValue === inputStartValue ? "input-error" : ""}`} onChange = {onChangeInputStartValueHandler}/>
        </div>
        <Button title = {"set"} className = {"btn-style"} onClick = {onClickSetHandler} disabled = {isSetDisabled}/>
      </div>

      <div className = {"counter-wrapper"}>
        <Counter Value = {displayValue} className = {`value-style ${!isIncorrectValue && !isPendingSet && Value === counterMaxValue ? "max-value-style" : ""} ${isIncorrectValue ? "incorrect-value-style" : ""} ${isPendingSet ? "pending-value-style" : ""}`} />
        <Button title = {"inc"} onClick = {onClickIncHandler} disabled = {Value === counterMaxValue || isIncorrectValue || isPendingSet} className = {"btn-style"}/>
        <Button title = {"reset"} onClick = {onClickResetHandler} disabled = {isIncorrectValue || isPendingSet} className = {"btn-style"}/>
      </div>
    </div>
  )
}


