import React, { useState } from "react";
import data from "../data/faq";
import Faq from "./Faq";

const Faqs = () => {
  const [questions] = useState(data);

  return (
    <div className="faq" id="faq">
      <div className="faq-container">
        <div className="mb-[49px]">
          <p className="faq-container-subtitle">FAQ</p>
          <p className="faq-container-title">Frequently Asked Questions</p>
          <p className="underline"></p>
        </div>

        {questions.map((question) => {
          return <Faq key={question.id} {...question} />;
        })}
      </div>
    </div>
  );
};

export default Faqs;
