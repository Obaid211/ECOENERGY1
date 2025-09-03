import React, { useState, useEffect } from 'react';
import './WasteInput.css';
import { getDatabase, onValue, ref } from 'firebase/database';
import { app } from '../firebase';

const WasteInput = () => {
  const [weight, setWeight] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const db = getDatabase(app);
    const testRef = ref(db, 'test');
    
    // Listen to database changes
    const unsubscribe = onValue(testRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Raw database data:', data);
      console.log('Data type:', typeof data);
      
      let weightValue = 0;
      
      // Handle different data structures
      if (data !== null && data !== undefined) {
        if (typeof data === 'number') {
          // If data is directly a number
          weightValue = data;
          console.log('Weight from direct number:', weightValue);
        } else if (typeof data === 'object') {
          
          if (data.weight !== undefined) {
            weightValue = data.weight;
            console.log('Weight from data.weight:', weightValue);
          } else if (data.value !== undefined) {
            weightValue = data.value;
            console.log('Weight from data.value:', weightValue);
          } else {
            
            const values = Object.values(data);
            if (values.length > 0 && typeof values[0] === 'number') {
              weightValue = values[0];
              console.log('Weight from first value:', weightValue);
            } else if (values.length > 0 && typeof values[0] === 'object' && values[0].weight !== undefined) {
              weightValue = values[0].weight;
              console.log('Weight from nested object:', weightValue);
            }
          }
        }
      }
      
      console.log('Final weight value:', weightValue);
      setWeight(Number(weightValue) || 0);
      setLastUpdated(new Date());
      setLoading(false);
    }, (error) => {
      console.error('Database error:', error);
      setLoading(false);
    });

    
    return () => unsubscribe();
  }, []);

  // Calculate biogas production (1 kg wet waste = 0.04 m³ biogas)
  const calculateBiogas = (weight) => {
    return (weight * 0.04).toFixed(3);
  };

  // Calculate meals (1 kg wet waste = 2.2 meals worth of energy)
  const calculateMeals = (weight) => {
    return Math.round(weight * 2.2);
  };

  // Calculate eco-points (1 kg = 10 points)
  const calculateEcoPoints = (weight) => {
    return Math.round(weight * 10);
  };

  // Get calculated values
  const biogas = calculateBiogas(weight);
  const meals = calculateMeals(weight);
  const ecoPoints = calculateEcoPoints(weight);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="card-header">
          <h2 className="card-title">Live Waste Input</h2>
          <div className="status-indicator">
            <div className={`status-dot ${loading ? 'loading' : 'active'}`}></div>
            <span className="status-text">{loading ? 'Loading...' : 'Live'}</span>
          </div>
        </div>

        {/* Weight Display */}
        <div className="weight-display">
          <div className="weight-value">
            {loading ? '---' : weight.toFixed(1)} kg
          </div>
          <div className="weight-label">Current Wet Waste</div>
        </div>

        {/* Conversion Chain */}
        <div className="conversion-chain">
          <div className="conversion-item">
            <span className="conversion-value">
              {loading ? '---' : biogas} m³
            </span>
            <span className="conversion-label">Biogas</span>
          </div>
          <div className="conversion-arrow">→</div>
          <div className="conversion-item">
            <span className="conversion-value">
              {loading ? '---' : meals}
            </span>
            <span className="conversion-label">Meals</span>
          </div>
        </div>

        {/* Eco Points */}
        <div className="eco-points">
          <div className="eco-points-value">
            {loading ? '---' : ecoPoints}
          </div>
          <div className="eco-points-label">Eco-Points Earned</div>
        </div>

        {/* Last Updated */}
        <div className="last-updated">
          Last updated: {loading ? 'Loading...' : lastUpdated?.toLocaleTimeString()}
        </div>


      </div>
    </div>
  );
};

export default WasteInput;