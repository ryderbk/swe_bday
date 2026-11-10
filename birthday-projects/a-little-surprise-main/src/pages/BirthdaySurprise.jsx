import { useState } from "react";

import Welcome from "../components/WelcomeSection/Welcome";
import BalloonCompo from "../components/BalloonSection/BalloonCompo";
import Candle from "../components/CandleSection/Candle";
import Bouquet from "../components/BouquetSection/Bouquet";
import MomentsSlider from "../components/MomentsSection/MomentsSlider";
import Envelope from "../components/EnvelopeSection/Envelope";
import GiftBox from "../components/GiftSection/GiftBox";
import FinalCelebration from "../components/FinalSection/FinalCelebration";

function BirthdaySurprise() {

  const [step, setStep] = useState(1);


  const nextStep = () => {
    setStep((prev) => prev + 1);
  };


  return (

    <div>

      {step === 1 && (

        <Welcome nextStep={nextStep} />

      )}

      {step === 2 && (
       <BalloonCompo nextStep={nextStep} />
      )}

      {step === 3 && (
        <Candle nextStep={nextStep} />
      )}
      {step === 4 && (
        <Bouquet nextStep={nextStep} />
      )}
      {step === 5 && (
        <MomentsSlider nextStep={nextStep} />
      )}
      {step === 6 && (
        <h1 className="text-4xl text-center mt-5">
          <Envelope nextStep={nextStep}  />
       </h1>
      )}
      {step === 7 && (
        <GiftBox nextStep={nextStep} />
      )}
      {step === 8 && (
        <FinalCelebration />
      )}

    </div>

  );
}

export default BirthdaySurprise;