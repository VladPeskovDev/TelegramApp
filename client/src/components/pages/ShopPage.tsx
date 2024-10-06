import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import useShopQueueByDate from '../hooks/useShopQueueByDate';
import SubmitUser from '../ui/SubmitUser'; 
import DeleteUser from '../ui/DeleteUser'; 

export default function ShopPage(): JSX.Element {
  const { id } = useParams<{ id: string }>(); 
  const { queue, loading, error, fetchQueueByDate } = useShopQueueByDate();
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 

  const today = new Date().toISOString().split('T')[0]; 

  useEffect(() => {
    if (id) {
      fetchQueueByDate(id, today); 
    }
  }, [id]); 

  const handleOpenModal = (): void => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  const handleSubmitUser = (firstName: string, lastName: string): void => {
    console.log('Пользователь записан:', firstName, lastName);
    setIsModalOpen(false);
  };

  const handleOpenDeleteModal = (): void => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = (): void => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteUser = (): void => {
    console.log('Запись удалена');
    setIsDeleteModalOpen(false);
  };

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

      {/* Проверяем наличие пользователей */}
      {queue.users && queue.users.length > 0 ? (
        <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Фамилия</TableCell>
                <TableCell>Имя</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queue.users.map((user, index) => (
                <TableRow key={user.user_id || index}>
                  <TableCell>{index + 1}</TableCell> {/* Порядковый номер */}
                  <TableCell>{user.user?.last_name}</TableCell> {/* Фамилия */}
                  <TableCell>{user.user?.first_name}</TableCell> {/* Имя */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" sx={{ marginTop: '20px' }}>
          Нет записанных пользователей.
        </Typography>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Записаться
        </Button>

        <Button variant="contained" color='error' onClick={handleOpenDeleteModal}>
          Удалить запись
        </Button>
      </div>

      {/* Модальные окна */}
      <SubmitUser open={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitUser} />
      <DeleteUser open={isDeleteModalOpen} onClose={handleCloseDeleteModal} onDelete={handleDeleteUser} />
    </div>
  );
}
