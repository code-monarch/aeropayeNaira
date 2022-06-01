import React, { useState } from "react";
import { ReactComponent as Minus } from "../assets/minus.svg";
import { ReactComponent as Plus } from "../assets/plus.svg";

const Faq = ({ question, answer }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={`question-container ${showInfo && "active-question"}`}>
      <div className="flex items-center justify-between questions">
        <p className="questions-items">{question}</p>
        <button type="button" onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? <Minus /> : <Plus />}
        </button>
      </div>
      {showInfo && <p className="questions-answer">{answer}</p>}
    </div>
  );
};

export default Faq;
