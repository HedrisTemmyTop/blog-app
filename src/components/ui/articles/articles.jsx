import React from "react";
import classes from "../../../styles/Articles.module.css";
import Box from "./Box";
import img1 from "../../../assets/Rectangle 12.png";
import img2 from "../../../assets/Rectangle 6.png";
import img3 from "../../../assets/Rectangle 11.png";
import img4 from "../../../assets/Rectangle 4.png";
import user from "../../../assets/Ellipse.png";
import popular1 from "../../../assets/Frame 73.png";
import popular2 from "../../../assets/Frame55.png";
import popular3 from "../../../assets/Frame 74.png";

import Updates from "./updates";
const Articles = () => {
  const data = [
    {
      id: 1,
      image: img1,
      head: "Why XSS Attacks are more dangerous for capacitor/corodova apps",
      category: ["intermediate", "advanecd", "security"],
      text: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      user: user,
    },
    {
      id: 2,
      image: img2,
      head: "Why XSS Attacks are more dangerous for capacitor/corodova apps",
      category: ["intermediate", "advanecd", "security"],
      text: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      user: user,
    },
    {
      id: 3,
      image: img1,
      head: "Why XSS Attacks are more dangerous for capacitor/corodova apps",
      category: ["intermediate", "advanecd", "security"],
      text: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      user: user,
    },
    {
      id: 4,
      image: img1,
      head: "Why XSS Attacks are more dangerous for capacitor/corodova apps",
      category: ["intermediate", "advanecd", "security"],
      text: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      user: user,
    },
    {
      id: 5,
      image: img3,
      head: "Why XSS Attacks are more dangerous for capacitor/corodova apps",
      category: ["intermediate", "advanecd", "security"],
      text: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      user: user,
    },
    {
      id: 6,
      image: img4,
      head: "Why XSS Attacks are more dangerous for capacitor/corodova apps",
      category: ["intermediate", "advanecd", "security"],
      text: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      user: user,
    },
    {
      id: 7,
      image: img2,
      head: "Why XSS Attacks are more dangerous for capacitor/corodova apps",
      category: ["intermediate", "advanecd", "security"],
      text: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      user: user,
    },
    {
      id: 8,
      image: img2,
      head: "Why XSS Attacks are more dangerous for capacitor/corodova apps",
      category: ["intermediate", "advanecd", "security"],
      text: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      user: user,
    },
    {
      id: 9,
      image: img2,
      head: "Why XSS Attacks are more dangerous for capacitor/corodova apps",
      category: ["intermediate", "advanecd", "security"],
      text: "In this article, we demonstrate how there are more avenues for XSS attacks in Capacitor/Cordova  applications and how the impact can be worse.",
      user: user,
    },
  ];
  const popularData = [
    {
      image: popular2,
      links: ["PWA", "Stencil", "Beginner"],
      text: "Building a PWA with Stencil: Rendering Layouts",
    },
    {
      image: popular1,
      links: ["PWA", "Stencil", "Beginner"],
      text: "Building a PWA with Stencil: Rendering Layouts",
    },
    {
      image: popular3,
      links: ["PWA", "Stencil", "Beginner"],
      text: "Building a PWA with Stencil: Rendering Layouts",
    },
  ];
  return (
    <div className={classes.Articles}>
      <div className={classes.Head}>Latest Articles</div>
      <div className={classes.Container}>
        <Box data={data} />
        <Updates data={popularData} />
      </div>
    </div>
  );
};

export default Articles;
