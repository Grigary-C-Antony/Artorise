import { useState } from "react";
import TopSection from "./Components/TopSection";
import ContentSection from "./Components/ContentSection";

function App() {
  return (
    <div style={{ backgroundColor: "#33343D" }}>
      <div className="flex flex-col h-screen w-auto ">
        <div className="h-16">
          <TopSection />
        </div>
        <div className="h-5/6">
          <ContentSection />
        </div>
      </div>
    </div>
  );
}

export default App;
