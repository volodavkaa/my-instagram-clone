import React, { useState } from 'react';
import { addPost } from '../firebase'; // Оновіть шлях до імпорту, якщо потрібно
import { storage } from '../firebase'; // Імпортуємо сховище Firebase
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CreatePost = () => {
  const [postContent, setPostContent] = useState('');
  const [image, setImage] = useState(null);

  // Обробник змін файлу
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Обробник надсилання форми
  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = '';

    // Завантажуємо фото, якщо воно є
    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    // Додаємо пост з вмістом і посиланням на фото
    await addPost({ content: postContent, imageUrl });
    setPostContent('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="Введіть свій пост"
      />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Додати пост</button>
    </form>
  );
};

export default CreatePost;
