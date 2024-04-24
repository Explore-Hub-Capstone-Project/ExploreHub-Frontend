import React from "react";
import "../styles/aboutus.scss";
import Header from "./header";
import githubIcon from "../styles/Icons/github.svg";
import linkedinIcon from "../styles/Icons/LinkedIn.svg";
import saurabhImg from "../styles/Icons/saurabh.jpg";
import anitaImg from "../styles/Icons/anita.jpg";
import khusbooImg from "../styles/Icons/khusboo.jpg";
import dhruviImg from "../styles/Icons/dhruvi.jpg";
import sagarImg from "../styles/Icons/sagar.jpg";

type Member = {
  name: string;
  role: string;
  photoUrl: string;
  githubUrl: string;
  linkedinUrl: string;
};

const teamMembers: Member[] = [
  {
    name: "Sagar Hedaoo",
    role: "Team Lead",
    photoUrl: sagarImg,
    githubUrl: "https://github.com/sagarhedaoo",
    linkedinUrl: "https://linkedin.com/in/sagarhedaoo",
  },
  {
    name: "Saurabh Agrawal",
    role: "Frontend Developer",
    photoUrl: saurabhImg,
    githubUrl: "https://github.com/saurabhagrl",
    linkedinUrl: "https://www.linkedin.com/in/agrawal-saurabh9/",
  },
  {
    name: "Dhruvi Patel",
    role: "Frontend Developer",
    photoUrl: dhruviImg,
    githubUrl: "https://github.com/DhruviPatel157",
    linkedinUrl: "https://www.linkedin.com/in/dhruvipatel157/",
  },
  {
    name: "Anita Ershadi",
    role: "Backend Developer",
    photoUrl: anitaImg,
    githubUrl: "https://github.com/AnittaEr",
    linkedinUrl: "https://www.linkedin.com/in/anita-ershadi/",
  },
  {
    name: "Khusboo Patel",
    role: "Backend Developer",
    photoUrl: khusbooImg,
    githubUrl: "https://github.com/khusboo30",
    linkedinUrl: "https://www.linkedin.com/in/khusboo-patel-bb5a601b4/",
  },
];

const AboutUs = () => {
  return (
    <div className="main-page-container">
      <Header />
      <div className="about-us-container">
        <h1>About Us</h1>
        <p>
          Welcome to our travel booking platform where you can effortlessly book
          flights, hotels, check local attractions, and weather all in one
          place!
        </p>
        <div className="team-members">
          {teamMembers.map((member) => (
            <div key={member.name} className="team-member">
              <img
                src={member.photoUrl}
                alt={member.name}
                className="member-photo"
              />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <div className="social-links">
                <a
                  href={member.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={githubIcon} alt="GitHub" />
                </a>
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={linkedinIcon} alt="LinkedIn" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
