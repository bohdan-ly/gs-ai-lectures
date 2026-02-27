import React from 'react';
import '../styles/MaterialsPage.css';
import ArrowIcon from 'assets/icons/arrow.svg';

export const LectureCard = ({ lecture, listView }) => {
  return (
    <div className={`materials__list__card${listView ? '--row' : ''}`}>
      <div className="materials__list__card__image">
        <img src={lecture.image} alt="card1-icon" />
      </div>
      <div className="materials__list__card__content">
        <div className="materials__list__card__content__text">
          <h3>{lecture.title}</h3>
          <p>{lecture.description}</p>
        </div>
        <div className="materials__list__card__content__button">
          <button className="button icon">
            <span>Переглянути</span>
            <img src={ArrowIcon} alt="play-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};