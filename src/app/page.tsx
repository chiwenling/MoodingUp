import Welcome from "./Components/Welcome"
import Step from "./Components/Step"
import Team from "./Components/Team";


export default function Home() {
  return (
    <div className="min-h-screen">    
      <Step /> 
      <Welcome />
      <Team />
    </div> 
  );
}







