import React, { useState } from "react";
import styles from "./Cards.module.css";
import Content from "./data.json";

export default function Tracks() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    document.body.style.overflow = "hidden"; // Prevent scrolling when the popup is open
  };

  const handleGoBack = () => {
    setSelectedEvent(null);
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  const generateEventDiv = (event, index) => {
    const { id, title, description, backgroundColor } = event;
    return (
      <div
        key={id}
        className={styles.Ev}
        style={{ backgroundColor: backgroundColor || "#f0f0f0" }} // Set background color
        onClick={() => handleEventClick(event)}
      >
        <div className={styles.eventContent}>
          <h1 className={styles.heading}>{title}</h1>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.mainheading}>Tracks</h1>
      <div className={styles.container}>
        {Content.map((event, index) => generateEventDiv(event, index))}
      </div>
    </div>
  );
}
