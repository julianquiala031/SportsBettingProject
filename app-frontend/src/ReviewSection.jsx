import React from 'react';
import styles from './ReviewCardStyle.module.css';
{/*Review cards section*/}

const reviews = [
    {
      username: "User123",
      review: "This app is 🔥! Super clean UI and easy to use.",
      image: "", // leave empty to trigger fallback avatar
      starReview: "⭐⭐⭐⭐⭐",
    },
    {
      username: "HappyUser",
      review: "Honestly the best betting app I've tried.",
      image: "",
      starReview: "⭐⭐⭐⭐⭐",
    },
    {
      username: "BetaWolf",
      review: "Slick and fast, everything just works.",
      image: "", // fallback
      starReview: "⭐⭐⭐⭐☆",
    },
    {
      username: "AnnaBets",
      review: "Super user-friendly and intuitive.",
      image: "",
      starReview: "⭐⭐⭐⭐⭐",
    },
    {
      username: "LuckyLuke",
      review: "My go-to app before every game.",
      image: "",
      starReview: "⭐⭐⭐⭐⭐",
    },
    {
      username: "ProTipsGal",
      review: "Great insights and smooth design.",
      image: "",
      starReview: "⭐⭐⭐ ☆ ☆",
    },
  ];

export default function ReviewSection(){
return (
        <section className={styles.reviewsSection}>
            <h2>User Reviews</h2>
            <div className={styles.reviewBox}>
                {reviews.map((user, index) => (
                    <div key={index} className={styles.reviewCard}>
                    <img
                        src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${user.username}`}
                        className={styles.profilePic}
                    />
                    <h3>@{user.username}</h3>
                    <p>{user.review}</p>
                    <p >{user.starReview}</p>
                    </div>
                ))}
                </div>
        </section>
        
    );
}