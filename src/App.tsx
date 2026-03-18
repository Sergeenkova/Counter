import React from 'react';
import './App.css';
import { Counter } from './components/Counter';
import { Button } from './components/Button';
import { Label } from "./components/Label";
import { Input } from "./components/Input"
import { useEffect, useState,  ChangeEvent } from 'react';


export const App = () => {
  // const defaultStartValue = 0
  // const defaultMaxValue = 1
  // const deltaValue = 1

  //Состояния счетчика
  //Настройки счётчика: граничные значения, которые пользователь задаёт через инпуты и применяет кнопкой Set
  const [counterStartValue, setCounterStartValue] = useState<number>(0)
  const [counterMaxValue, setCounterMaxValue] = useState<number>(1)

  //Текущее значение счётчика, которое видит пользователь на экране (то, что увеличивается и сбрасывается)
  const [Value, setValue] = useState<number>(counterStartValue)

  //Состояния инпута
  const [inputStartValue, setInputStartValue] = useState<number>(0)
  const [inputMaxValue, setInputMaxValue] = useState<number>(1)

  //Недопустимые значения в инпуте
  const isIncorrectValue = inputStartValue < 0 || inputMaxValue <= inputStartValue

  //условия, при которых кнопка set "готова к нажатию" (в настройках счетчика введены допустимые значения и эти значения новые, т.е. отличаются 
  //от уже отправленных в счетчик)
  const isPendingSet = !isIncorrectValue && (inputStartValue !== counterStartValue || inputMaxValue !== counterMaxValue)

  //условия, при которых кнопка set неактивна
  const isSetDisabled = isIncorrectValue || !isPendingSet

  //Цепочка тернарных операторов, заменяющая логику if else ниже. Отображаемое значение (displayed value) может быть как числом, 
  //так и строкой-предупреждением, поэтому в компоненте Counter для Value тип: number | string, а в app: Value = {displayValue}
  const displayValue = isIncorrectValue ? "Incorrect value!" : isPendingSet ? "Enter values and press set" : Value
  
// let displayValue;
// if (isIncorrectValue) {
//   displayValue = "Incorrect value!"; // введены недопустимые значения
// } else if (isPendingSet) {
//   displayValue = "Enter values and press set"; // значения изменены, но Set ещё не нажат
// } else {
//   displayValue = Value; // всё ок — показываем текущее значение счётчика
// }

  useEffect(() => {
    let inputStartValueAsString = localStorage.getItem("KeyStartValue")
    if (inputStartValueAsString) {
      let newInputStartValue = JSON.parse(inputStartValueAsString)
      setInputStartValue (newInputStartValue) 
      setCounterStartValue(newInputStartValue)
      
    }
  }, [])


  useEffect(() => {
    let inputMaxValueAsString = localStorage.getItem("KeyMaxValue")
    if (inputMaxValueAsString) {
      let newInputMaxValue = JSON.parse(inputMaxValueAsString)
      setInputMaxValue (newInputMaxValue) 
      setCounterMaxValue(newInputMaxValue)
    }
  }, [])

  
//Блок настроек счетчика: 
//Устанавливаем максимальное значение в инпуте
  const onChangeInputMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newInputMaxValue = Number(e.target.value);
    setInputMaxValue(newInputMaxValue);
  }

//Устанавливаем стартовое значение в инпуте
  const onChangeInputStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newInputStartValue = Number(e.target.value);
    setInputStartValue(newInputStartValue);
  }


//По нажатию на кнопку set стартовое и максимальное значения из инпута отрисовываются в счетчике 
  const onClickSetHandler = () => {
      setCounterStartValue(inputStartValue)
      setCounterMaxValue(inputMaxValue)
      localStorage.setItem("KeyStartValue", JSON.stringify(inputStartValue))
      localStorage.setItem("KeyMaxValue", JSON.stringify(inputMaxValue))
  }


//При нажатии на кнопку Inc увеличивается Value на значение deltaValue
  const onClickIncHandler = () => {
    if (Value < counterMaxValue) {
      setValue (Value + 1)
    }
  }

//При нажатии на кнопку reset Value возвращается к стартовому установленному значению
  const onClickResetHandler = () => {
    setValue (counterStartValue)
  }

//если стартовое значение изменились, установи Value на новый старт
  useEffect(() => {
    setValue(counterStartValue)
  }, [counterStartValue])



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


