import React from "react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Potential ROI",
      description: "We guide decisions that maximize returns through strategic design and staging.",
      emoji: "📈",
    },
    {
      title: "Design",
      description: "Our aesthetic vision transforms spaces into compelling buyer experiences.",
      emoji: "🎨",
    },
    {
      title: "Marketing",
      description: "We blend digital and traditional marketing to reach the widest audience.",
      emoji: "📢",
    },
  ];

  return (
    <section id="why-choose-us" className="why-section">
      <div className="why-container">
        <h2>Why Choose Us?</h2>
        <div className="why-cards">
          {features.map((feature, idx) => (
            <div className="why-card" key={idx}>
              <div className="why-emoji">{feature.emoji}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
