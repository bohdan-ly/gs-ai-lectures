import React from 'react';
import SplitText from '../custom/SplitText';
import '../styles/MaterialsPage.css';

function Layout(props) {
  return (
    <div className="materials">
      <div className="container">
        <div className="materials__title">
          <SplitText
            text="Welcome to the GS Materials!"
            className="text-2xl font-semibold text-center"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            showCallback
          />
        </div>
        <div className="materials__header">
          <div className="materials__header__counter">
            <h3>Found 158 rentals</h3>
          </div>
          <div className="materials__header__input">
            <div className="input__wrapper">
              <input type="text" className="input" placeholder="Search by lectures..." />
            </div>
          </div>

          <div className="material__header__mode">
            <button
              className={`button__mode${!props.listView ? ' button__mode--active' : ''}`}
              onClick={props.gridLayoutHandler}
            >
              <img src="../../src/assets/matrials_page/grid.svg" alt="grid-icon" />
            </button>
            <button
              className={`button__mode${props.listView ? ' button__mode--active' : ''}`}
              onClick={props.listLayoutHandler}
            >
              <img src="../../src/assets/matrials_page/list.svg" alt="list-icon" />
            </button>
          </div>
        </div>

        <div className={props.listView ? 'materials__list--row' : 'materials__list'}>
          <div className={`materials__list__card${props.listView ? '--row' : ''}`}>
            <div className="materials__list__card__image">
              <img src="../../src/assets/matrials_page/placeholder.jpg" alt="card1-icon" />
            </div>
            <div className="materials__list__card__content">
              <div className="materials__list__card__content__text">
                <h3>Лекція №3. Q/A сесія з React</h3>
                <p>
                  На цій лекції відбудеться Q/A сесія, присвячена розробці з використанням React.
                  Розглянемо поширені запитання щодо компонентної архітектури, стану, хуків
                </p>
              </div>
              <div className="materials__list__card__content__button">
                <button className="button icon">
                  <span>Переглянути</span>
                  <img src="../../src/assets/matrials_page/arrow_btn.svg" alt="play-icon" />
                </button>
              </div>
            </div>
          </div>
          <div className={`materials__list__card${props.listView ? '--row' : ''}`}>
            <div className="materials__list__card__image">
              <img src="../../src/assets/matrials_page/placeholder.jpg" alt="card1-icon" />
            </div>
            <div className="materials__list__card__content">
              <div className="materials__list__card__content__text">
                <h3>Лекція №3. Q/A сесія з React</h3>
                <p>
                  На цій лекції відбудеться Q/A сесія, присвячена розробці з використанням React.
                  Розглянемо поширені запитання щодо компонентної архітектури, стану, хуків
                </p>
              </div>
              <div className="materials__list__card__content__button">
                <button className="button icon">
                  <span>Переглянути</span>
                  <img src="../../src/assets/matrials_page/arrow_btn.svg" alt="play-icon" />
                </button>
              </div>
            </div>
          </div>
          <div className={`materials__list__card${props.listView ? '--row' : ''}`}>
            <div className="materials__list__card__image">
              <img src="../../src/assets/matrials_page/placeholder.jpg" alt="card1-icon" />
            </div>
            <div className="materials__list__card__content">
              <div className="materials__list__card__content__text">
                <h3>Лекція №3. Q/A сесія з React</h3>
                <p>
                  На цій лекції відбудеться Q/A сесія, присвячена розробці з використанням React.
                  Розглянемо поширені запитання щодо компонентної архітектури, стану, хуків
                </p>
              </div>
              <div className="materials__list__card__content__button">
                <button className="button icon">
                  <span>Переглянути</span>
                  <img src="../../src/assets/matrials_page/arrow_btn.svg" alt="play-icon" />
                </button>
              </div>
            </div>
          </div>
          <div className={`materials__list__card${props.listView ? '--row' : ''}`}>
            <div className="materials__list__card__image">
              <img src="../../src/assets/matrials_page/placeholder.jpg" alt="card1-icon" />
            </div>
            <div className="materials__list__card__content">
              <div className="materials__list__card__content__text">
                <h3>Лекція №3. Q/A сесія з React</h3>
                <p>
                  На цій лекції відбудеться Q/A сесія, присвячена розробці з використанням React.
                  Розглянемо поширені запитання щодо компонентної архітектури, стану, хуків
                </p>
              </div>
              <div className="materials__list__card__content__button">
                <button className="button icon">
                  <span>Переглянути</span>
                  <img src="../../src/assets/matrials_page/arrow_btn.svg" alt="play-icon" />
                </button>
              </div>
            </div>
          </div>
          <div className={`materials__list__card${props.listView ? '--row' : ''}`}>
            <div className="materials__list__card__image">
              <img src="../../src/assets/matrials_page/placeholder.jpg" alt="card1-icon" />
            </div>
            <div className="materials__list__card__content">
              <div className="materials__list__card__content__text">
                <h3>Лекція №3. Q/A сесія з React</h3>
                <p>
                  На цій лекції відбудеться Q/A сесія, присвячена розробці з використанням React.
                  Розглянемо поширені запитання щодо компонентної архітектури, стану, хуків
                </p>
              </div>
              <div className="materials__list__card__content__button">
                <button className="button icon">
                  <span>Переглянути</span>
                  <img src="../../src/assets/matrials_page/arrow_btn.svg" alt="play-icon" />
                </button>
              </div>
            </div>
          </div>
          <div className={`materials__list__card${props.listView ? '--row' : ''}`}>
            <div className="materials__list__card__image">
              <img src="../../src/assets/matrials_page/placeholder.jpg" alt="card1-icon" />
            </div>
            <div className="materials__list__card__content">
              <div className="materials__list__card__content__text">
                <h3>Лекція №3. Q/A сесія з React</h3>
                <p>
                  На цій лекції відбудеться Q/A сесія, присвячена розробці з використанням React.
                  Розглянемо поширені запитання щодо компонентної архітектури, стану, хуків
                </p>
              </div>
              <div className="materials__list__card__content__button">
                <button className="button icon">
                  <span>Переглянути</span>
                  <img src="../../src/assets/matrials_page/arrow_btn.svg" alt="play-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
