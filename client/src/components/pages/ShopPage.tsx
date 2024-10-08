import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Button, TextField
} from '@mui/material';
import useShopQueueByDate from '../hooks/useShopQueueByDate';
import SubmitUser from '../ui/SubmitUser';
import DeleteUser from '../ui/DeleteUser';



export default function ShopPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { queue, loading, error, fetchQueueByDate } = useShopQueueByDate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedStoreId, setSelectedStoreId] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const telegramId = queryParams.get('telegram_id');


  useEffect(() => {
    if (id && selectedDate) {
      fetchQueueByDate(id, selectedDate);
    }
  }, [id, selectedDate]);

  const handleOpenModal = (): void => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedDate(e.target.value);
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
    return <Button variant="contained" color="primary" onClick={() => window.location.reload()}>Очередь не найдена, вернитесь назад</Button>;
  }

  if (!queue) {
    return <p>Открытых очередей нет для данного магазина</p>;
  }

  return (
    <div>
      <h2>{queue.name}</h2>
      <h3>{queue.message}</h3>

      <TextField
        label="Выберите дату"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        sx={{ marginBottom: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />

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
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.user?.last_name}</TableCell>
                  <TableCell>{user.user?.first_name}</TableCell>
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

        <Button variant="contained" color="error" onClick={handleOpenDeleteModal}>
          Удалить запись
        </Button>
      </div>

      <SubmitUser
        open={isModalOpen}
        onClose={handleCloseModal}
        selectedDate={selectedDate}
        telegramId={telegramId}
      />
      <DeleteUser
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        storeId={selectedStoreId}
        date={selectedDate}
        telegramId={telegramId}
      />
    </div>
  );
}
