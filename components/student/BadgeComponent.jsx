"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const BadgePool = () => {
  const { user, userType, token } = useSelector((state) => state.auth);
  const [badges, setBadges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/profile/${user.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch profile data.");

        const data = await response.json();

        // Dummy contribution data (replace with API response when available)
        const contributions = [
          { date: "2025-01-20", contributions: 35 },
          { date: "2024-12-05", contributions: 120 },
          { date: "2024-10-01", contributions: 650 },
          { date: "2024-06-15", contributions: 1050 },
        ];

        // Calculate earned badges
        const currentDate = new Date();
        let weeklyTotal = 0,
          monthlyTotal = 0,
          halfYearTotal = 0,
          yearlyTotal = 0;

        contributions.forEach((item) => {
          if (!item?.date || typeof item.contributions !== "number") return;
          const contributionDate = new Date(item.date);
          const timeDiff = currentDate - contributionDate;
          const weeks = timeDiff / (1000 * 60 * 60 * 24 * 7);
          const months = timeDiff / (1000 * 60 * 60 * 24 * 30);
          const years = timeDiff / (1000 * 60 * 60 * 24 * 365);

          if (weeks <= 1) weeklyTotal += item.contributions;
          if (months <= 1) monthlyTotal += item.contributions;
          if (months <= 6) halfYearTotal += item.contributions;
          if (years <= 1) yearlyTotal += item.contributions;
        });

        let earnedBadges = [];
        if (weeklyTotal >= 30) earnedBadges.push({ id: 1, label: "🌟", color: "#353a4f" });
        if (monthlyTotal >= 100) earnedBadges.push({ id: 2, label: "🏆", color: "#7d2b8b" });
        if (halfYearTotal >= 600) earnedBadges.push({ id: 3, label: "🔥", color: "#43a7e7" });
        if (yearlyTotal >= 1000) earnedBadges.push({ id: 4, label: "🎯", color: "#46b385" });

        setBadges(earnedBadges);
      } catch (error) {
        console.error("Error fetching badges:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBadges();
  }, [user.id, userType, token]);

  if (isLoading) return <p>Loading badges...</p>;

  return (
    <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
      {badges.length > 0 ? (
        badges.map((badge) => (
          <div
            key={badge.id}
            style={{
              width: "50px",
              minWidth: "50px",
              height: "50px",
              backgroundColor: badge.color,
              position: "relative",
              marginRight: "25px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "22px",
              color: "white",
              // borderRadius: "50%", // Circular badge
              boxShadow: `0 4px 6px rgba(0, 0, 0, 0.2)`,
            }}
          >
            <span>{badge.label}</span>
            <div
              style={{
                content: '""',
                position: "absolute",
                bottom: "-20px",
                width: "100%",
                borderTop: `20px solid ${badge.color}`,
                borderRight: "25px solid transparent",
                borderLeft: "25px solid transparent",
                boxSizing: "border-box",
              }}
            ></div>
          </div>
        ))
      ) : (
        <p style={{ color: "#666" }}>No badges earned yet.</p>
      )}
    </div>
  );
};

export default BadgePool;
