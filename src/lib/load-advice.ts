export async function loadAdvice() {

  try {
    const res = await fetch("https://api.adviceslip.com/advice");

    if (!res.ok) {
      throw new Error("Error Advice");
    }

    const data = await res.json();

    const advice = data.slip.advice;

    return advice;
  } catch (error) {
    console.error("Error in loadAdvice:", error);
    return "Unable to access the board.";
  }

}
