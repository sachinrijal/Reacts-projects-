import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export function App() {
  const [step , stepCount] = useState(1);
  const [isOpen , setIsOpen] = useState(true);

  function handlePrevious(){
    if (step>1) return stepCount(step - 1);
  }

    function handleNext(){
    if (step < 3) return stepCount(step + 1);
  }

  return (
    <>

      <button className="close" onClick={()=> setIsOpen(!isOpen)}>&times;</button>

      {isOpen && <div className="steps">
        <div className="numbers">
          <div className="active">1</div>
          <div className={step >= 2 ? "active" : ""}>2</div>
          <div className={step >= 3 ? "active" : ""}>3</div>
        </div>

        {/* // messages  */}

        <div className="message">
          {messages[step - 1]}
        </div>

        {/* buttons */}
        <div className="buttons">
          <button
            className="button"
            onClick = {handlePrevious}
            style={{ backgroundColor: "#7950f2", color: "#fff" }}
          >
            <span>Previous</span>
          </button>
          <button 
          className="button"
          onClick={handleNext}
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
          >
            <span>Next</span>
          </button>
        </div>
      </div>}
    </>
  );
}
