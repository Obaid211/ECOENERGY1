import React, { useState } from "react";
import dummyData from "../assets/data/dummyData.json";
import styles from "./CollectionCentersMap.module.css";

const CollectionCentersMap = () => {
  const [selectedCenter, setSelectedCenter] = useState(null);

  const getCapacityPercentage = (current, capacity) => {
    return Math.round((current / capacity) * 100);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return styles.statusActive;
      case "maintenance":
        return styles.statusMaintenance;
      default:
        return styles.statusDefault;
    }
  };

  return (
    <div className={styles.container}>
      {/* Map Placeholder */}
      <div className={styles.mapPlaceholder}>
        <div className={styles.mapContent}>
          <div className={styles.mapIcon}>
            <span className="text-primary text-2xl">🗺️</span>
          </div>
          <p className="text-muted-foreground text-sm">Interactive Map</p>
          <p className="text-xs text-muted-foreground">Google Maps integration would show collection centers here</p>
        </div>
      </div>

      {/* Collection Centers List */}
      <div className={styles.centersList}>
        <h3 className={styles.centersTitle}>Collection Centers</h3>
        {dummyData.collectionCenters.map((center) => (
          <div
            key={center.id}
            className={styles.centerCard}
            onClick={() => setSelectedCenter(selectedCenter?.id === center.id ? null : center)}
          >
            <div className={styles.centerHeader}>
              <div className={styles.centerInfo}>
                <h4 className={styles.centerName}>{center.name}</h4>
                <p className={styles.centerAddress}>{center.address}</p>
                <div className={styles.centerMeta}>
                  <span className={getStatusClass(center.status)}>
                    {center.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {getCapacityPercentage(center.currentLoad, center.capacity)}% full
                  </span>
                </div>
              </div>
              <div className={styles.capacityInfo}>
                <div className={styles.capacityNumbers}>
                  {center.currentLoad}/{center.capacity}
                </div>
                <div className={styles.capacityLabel}>capacity</div>
              </div>
            </div>

            {selectedCenter?.id === center.id && (
              <div className={styles.centerDetails}>
                <div className={styles.detailsGrid}>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <span className={getStatusClass(center.status)}>
                      {center.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Capacity:</span>
                    <span className="text-foreground">{center.capacity} kg</span>
                  </div>
                </div>
                <button className={styles.directionsButton}>Get Directions →</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionCentersMap;
