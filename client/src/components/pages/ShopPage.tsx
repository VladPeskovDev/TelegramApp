import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useShopQueueByDate from '../hooks/useShopQueueByDate';

export default function ShopPage(): JSX.Element {
  const { id } = useParams<{ id: string }>(); 
  const { queue, loading, error, fetchQueueByDate } = useShopQueueByDate();

  const today = new Date().toISOString().split('T')[0]; 

  
  useEffect(() => {
    if (id) {
      fetchQueueByDate(id, today); 
    }
  }, [id]); 

  
  if (loading) {
    return <p>Загрузка...</p>;
  }

 
  if (error) {
    return <p>Ошибка: очередь не найдена</p>;
  }

  
  if (!queue) {
    return <p>Открытых очередей нет для данного СИЗО</p>;
  }

  return (
    <div>
      <h2>{queue.name}</h2> 
      <h3>{queue.message}</h3> 
    </div>
  );
}
