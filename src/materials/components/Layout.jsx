import GridIcon from 'assets/icons/grid.svg';
import ListIcon from 'assets/icons/list.svg';
import PlaceHolder from 'assets/icons/placeholder.jpg';
import SplitText from '../custom/SplitText';
import '../styles/MaterialsPage.css';

import { LectureCard } from './Lecture';

const lecturesMock = [
  {
    id: 1,
    title: 'Лекція №3. Q/A сесія з React',
    description:
      'На цій лекції відбудеться Q/A сесія, присвячена розробці з використанням React. Розглянемо поширені запитання щодо компонентної архітектури, стану, хуків',
    image: PlaceHolder,
  },
  {
    id: 2,
    title: 'Лекція №3. Q/A сесія з React',
    description:
      'На цій лекції відбудеться Q/A сесія, присвячена розробці з використанням React. Розглянемо поширені запитання щодо компонентної архітектури, стану, хуків',
    image: PlaceHolder,
  },
  {
    id: 3,
    title: 'Лекція №3. Q/A сесія з React',
    description:
      'На цій лекції відбудеться Q/A сесія, присвячена розробці з використанням React. Розглянемо поширені запитання щодо компонентної архітектури, стану, хуків',
    image: PlaceHolder,
  },
  {
    id: 4,
    title: 'Лекція №3. Q/A сесія з React',
    description:
      'На цій лекції відбудеться Q/A сесія, присвячена розробці з використанням React. Розглянемо поширені запитання щодо компонентної архітектури, стану, хуків',
    image: PlaceHolder,
  },
  {
    id: 5,
    title: 'Лекція №3. Q/A сесія з React',
    description:
      'На цій лекції відбудеться Q/A сесія, присвячена розробці з використанням React. Розглянемо поширені запитання щодо компонентної архітектури, стану, хуків',
    image: PlaceHolder,
  },
  {
    id: 6,
    title: 'Лекція №3. Q/A сесія з React',
    description:
      'На цій лекції відбудеться Q/A сесія, присвячена розробці з використанням React. Розглянемо поширені запитання щодо компонентної архітектури, стану, хуків',
    image: PlaceHolder,
  },
];

function Layout({ listView, viewTypes, switchLayout }) {
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
              className={`button__mode${!listView ? ' button__mode--active' : ''}`}
              onClick={() => switchLayout(viewTypes.GRID)}
            >
              <img src={GridIcon} alt="grid-icon" />
            </button>
            <button
              className={`button__mode${listView ? ' button__mode--active' : ''}`}
              onClick={() => switchLayout(viewTypes.LIST)}
            >
              <img src={ListIcon} alt="list-icon" />
            </button>
          </div>
        </div>

        <div className={listView ? 'materials__list--row' : 'materials__list'}>
          {lecturesMock.map((lecture) => (
            <LectureCard key={lecture.id} lecture={lecture} listView={listView} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Layout;
