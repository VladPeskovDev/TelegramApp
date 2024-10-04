import React from 'react';
import { useParams } from 'react-router-dom';
import useShop from '../hooks/useShop'; // Подключаем кастомный хук для получения данных магазина

export default function ShopPage(): JSX.Element {
  const { id } = useParams<{ id: string }>(); 
  const { shop } = useShop(id || '');

  if (!shop) {
    return <p>Открытых очередей нет для данного СИЗО</p>;
  }

  
  return (
    <div>
      <h1>{shop.name}</h1> {/* Отображаем название магазина */}
     
      {/* Здесь можно добавить другую информацию о магазине */}
    </div>
  );
}
