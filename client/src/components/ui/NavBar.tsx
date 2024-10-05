import React, { useState } from 'react';
import { Box, Typography, IconButton, Grid } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek'; 
import { useParams } from 'react-router-dom';
import useShopQueueByDate from '../hooks/useShopQueueByDate';

dayjs.extend(isoWeek); 

export default function Navbar(): JSX.Element {
  const { id } = useParams<{ id: string }>(); 
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('YYYY-MM-DD')); 
  const { queue, loading, error, fetchQueueByDate } = useShopQueueByDate(); 

  // Обработчик для переключения месяцев назад
  const handlePreviousMonth = (): void => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  // Обработчик для переключения месяцев вперед
  const handleNextMonth = (): void => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  
  const handleDateClick = (day: number): void => {
    const selected = currentMonth.date(day).format('YYYY-MM-DD');
    setSelectedDate(selected); // Устанавливаем выбранную дату
    fetchQueueByDate(id || '', selected); // Запрос на сервер для получения информации по выбранной дате
  };

  // Получаем дни текущего месяца для отображения в сетке
  const daysInMonth = currentMonth.daysInMonth(); // Количество дней в месяце
  const startDay = currentMonth.startOf('month').isoWeekday(); // День недели, с которого начинается месяц

  
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1); // Массив с числами дней месяца

  return (
    <Box
      sx={{
        padding: '10px 0',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd',
      }}
    >
      {/* Навигация по месяцам */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <IconButton onClick={handlePreviousMonth}>
          <ArrowBackIos />
        </IconButton>

        <Typography variant="h6">{currentMonth.format('MMMM YYYY')}</Typography> {/* Название месяца и года */}

        <IconButton onClick={handleNextMonth}>
          <ArrowForwardIos />
        </IconButton>
      </Box>

      {/* Заголовки дней недели */}
      <Grid container spacing={1} sx={{ textAlign: 'center', marginBottom: '10px' }}>
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
          <Grid item xs={12 / 7} key={day}>
            <Typography variant="subtitle1">{day}</Typography>
          </Grid>
        ))}
      </Grid>

      {/* Дни месяца */}
      <Grid container spacing={1} sx={{ textAlign: 'center' }}>
        {Array.from({ length: startDay - 1 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid item xs={12 / 7} key={`empty-${index}`}>
            <Typography>&nbsp;</Typography>
          </Grid>
        ))}

        {/* Числа дней месяца */}
        {daysArray.map((day) => (
          <Grid item xs={12 / 7} key={day}>
            <Typography
              variant="body1"
              sx={{
                cursor: 'pointer',
                padding: '5px',
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: '#ddd',
                },
              }}
              onClick={() => handleDateClick(day)} 
            >
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
