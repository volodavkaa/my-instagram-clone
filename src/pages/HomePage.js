import React from 'react';
import Header from '../components/Header';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost'; // Додано CreatePost
import { FaHome, FaSearch, FaRegHeart, FaUser } from 'react-icons/fa';

function HomePage() {
  return (
    <div className="container">
      <div className="sidebar">
        <h2>Навігація</h2>
        <p><FaHome /> Головна</p>
        <p><FaSearch /> Пошук</p>
        <p><FaRegHeart /> Повідомлення</p>
        <p><FaUser /> Профіль</p>
      </div>
      <div className="main-content">
        <Header />
        <div className="stories">
          <div className="story"></div>
          <div className="story"></div>
          <div className="story"></div>
          <div className="story"></div>
        </div>
        <CreatePost /> {/* Додаємо форму створення посту */}
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default HomePage;
