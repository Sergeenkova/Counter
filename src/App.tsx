import React from 'react';
import './App.css';
import { Counter } from './components/Counter';
import { Button } from './components/Button';
import { Label } from "./components/Label";
import { Input } from "./components/Input"
import { useState } from 'react';
import { ChangeEvent } from 'react';

export const App = () => {
  const minValue = 0
  const maxValue = 5
  const deltaValue = 1


  const [Value, setValue] = useState<number>(minValue)
  const [inputStartValue, setInputStartValue] = useState<number>(0)
  const [inputMaxValue, setInputMaxValue] = useState<number>(0)

 

  const onClickIncHandler = () => {
    if (Value < maxValue) {
      setValue (Value + deltaValue)
    }
  }

  const onClickResetHandler = () => {
    setValue (minValue)
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
        <Button title = {"set"} className = {"btn-style"} disabled = {inputMaxValue <= inputStartValue || inputStartValue < 0}/>
      </div>

      <div className = {"counter-wrapper"}>
        <Counter Value = {Value} className = {`value-style ${Value === maxValue ? "max-value-style" : ""}`} />
        <Button title = {"inc"} onClick = {onClickIncHandler} disabled = {Value === maxValue} className = {"btn-style"}/>
        <Button title = {"reset"} onClick = {onClickResetHandler} className = {"btn-style"}/>
      </div>
    </div>
  )
}


