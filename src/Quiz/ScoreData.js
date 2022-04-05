import React from "react";
const ScoreData = (props) => {
  const correctedAnswer = ["Tiger", "Narendra Modi", "1757", "2:3"];

  return (
    <>
      <div className={"result-heading"}>Result</div>
      <table>
        <tr>
          <td className={"heading"}>Correct Answer</td>
          <td className={"heading"}>Answer Given</td>
        </tr>
        {props.arrData.map((val, i) => (
          <tr>
            <td style={{ border: "1px solid black", padding: "10px" }}>
              {correctedAnswer[i]}
            </td>
            <td style={{ border: "1px solid black", padding: "10px" }}>
              {val === correctedAnswer[i] ? (
                val
              ) : (
                <span style={{ color: "red" }}>{val}</span>
              )}
            </td>
          </tr>
        ))}
      </table>
    </>
  );
};
export default ScoreData;
