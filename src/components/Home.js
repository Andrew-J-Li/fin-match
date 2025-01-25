import React from 'react';
import styles from '../styles/Home.css';
import { Briefcase, Target, UserCheck, MessageSquare } from 'lucide-react';

const Home = () => (
  <div style={{ width: "100%", height: "100vh", overflow: "hidden", position: "relative"}}>
    <div>
    <img src={require('../assets/stock.png')} alt="Financial Advisor" style ={{width: "100%"}}/>
    <div className="background">
      <div className="home-text">
        <p>
          Revolutionizing the way you invest by seamlessly matching prospective investors with financial advisors using AI and machine learning.
        </p>
      </div>
    </div>
    </div>
  </div>
  
);

export default Home;