import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, TextField, Box } from '@mui/material';
import useShopQueueByDate from '../hooks/useShopQueueByDate';
import SubmitUser from '../ui/SubmitUser';
import DeleteUser from '../ui/DeleteUser';

export default function ShopPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { queue, loading, error, fetchQueueByDate } = useShopQueueByDate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const telegramId = queryParams.get('telegram_id');
  
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    return localDate;
  });
  
  const [queueData, setQueueData] = useState(queue); 

  useEffect(() => {
    if (!id) {
      navigate('/error');
      return;
    }

    fetchQueueByDate(id, selectedDate);
  }, [id, selectedDate, navigate]);

  useEffect(() => {
    // Если произошла ошибка или очередь не найдена, сбрасываем состояние очереди
    if (!loading && (error || !queue)) {
      setQueueData(null);  // Очищаем состояние, если нет данных
    } else if (queue) {
      setQueueData(queue); // Устанавливаем очередь, если данные есть
    }
  }, [queue, loading, error]);

  const handleOpenModal = (): void => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedDate(e.target.value);
  };

  const handleOpenDeleteModal = (): void => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = (): void => {
    setIsDeleteModalOpen(false);
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      {queueData ? (
        <>
          <h2>{queueData.name}</h2>
          <h3>{queueData.message}</h3>
        </>
      ) : (
        <Typography variant="h6">Очередь не найдена</Typography>
      )}

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

      {queueData && queueData.users && queueData.users.length > 0 ? (
        <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Фамилия</TableCell>
                <TableCell>Имя/Отчество</TableCell>
                <TableCell>Время записи</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queueData.users.map((user, index) => (
                <TableRow key={user.user_id || index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.user?.last_name}</TableCell>
                  <TableCell>{user.user?.first_name}</TableCell>
                  <TableCell>
                 {user.createdAt && (() => {
                  const date = new Date(user.createdAt);
                  date.setHours(date.getHours() + 3); // Добавляем 3 часа для московского времени
                  return date.toLocaleString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                    });
                  })()}
                  </TableCell>

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

      <Box mt={3} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="inherit"
          onClick={() => navigate(`/?telegram_id=${telegramId}`)}
        >
          Вернуться в меню
        </Button>
      </Box>

      <SubmitUser
        open={isModalOpen}
        onClose={handleCloseModal}
        selectedDate={selectedDate}
        telegramId={telegramId}
      />
      {id && (
        <DeleteUser
          open={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          storeId={id}
          date={selectedDate}
          telegramId={telegramId}
        />
      )}
    </div>
  );
}

