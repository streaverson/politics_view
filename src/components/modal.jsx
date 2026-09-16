// import { useState } from "react";
import convertToPersianDigits from "../utils/persianHelper";

export default function Modal({
  handleContinue,
  fromStart,
  currentQuestion,
  questions,
}) {
  // baraye handel kardan modal localstoragee

  return (
    <>
      {currentQuestion >= 1 ? (
        <div className="modal">
          <p className="beforeStart">قبل از ادامه</p>
          <h1 className="cardTitle">می خوای ادامه بدی؟</h1>
          <p id="cardDescription">
            یه آزمون نیمه‌تموم پیدا کردیم — تا سوال{" "}
            {convertToPersianDigits(currentQuestion)} از
            {convertToPersianDigits(questions)} جواب دادی. می‌تونی از همون‌جا
            ادامه بدی یا از اول شروع کنی.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <button className="continueBtn" onClick={handleContinue}>
              {currentQuestion < 30
                ? ` ادامه از سوال ${convertToPersianDigits(currentQuestion + 1)}`
                : `نمایش نتیجه`}
            </button>

            <button className="startAgainBtn" onClick={fromStart}>
              شروع از اول
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
