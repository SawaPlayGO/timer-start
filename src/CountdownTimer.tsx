import React, { useState, useEffect } from "react";
import { IconButton, Snackbar } from "@mui/material";
import { Brightness4, Brightness7, FileCopy } from "@mui/icons-material";
import { FaDiscord, FaTelegram } from "react-icons/fa"; // Иконки Discord и Telegram из react-icons

const CountdownTimer: React.FC = () => {
  // Устанавливаем дату для 02.03.2025 19:00 по Новосибирскому времени (UTC+7)
  const targetDate = new Date("2025-03-02T19:00:00+07:00").getTime(); // Используем правильный формат

  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());
  const [showColon, setShowColon] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Функция обновления времени каждую секунду
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeRemaining = targetDate - currentTime;

      if (timeRemaining <= 0) {
        setTimeLeft(0); // Устанавливаем 0, когда время истекает
        setTimerEnded(true); // Таймер завершен
        clearInterval(interval); // Останавливаем интервал
      } else {
        setTimeLeft(timeRemaining); // Обновляем оставшееся время
        setShowColon((prev) => !prev); // Мигающий двоеточие
      }
    }, 1000);

    return () => clearInterval(interval); // Очистка интервала при размонтировании
  }, [targetDate]);

  // Форматируем оставшееся время
  const formatTime = (time: number) => {
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24).toString().padStart(2, "0");
    const minutes = Math.floor((time / (1000 * 60)) % 60).toString().padStart(2, "0");
    const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, "0");
    const colon = showColon ? ":" : " ";
    return `${hours}${colon}${minutes}${colon}${seconds}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("btlcho.ru");
    setSnackbarOpen(true); // Показываем Snackbar
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Закрываем Snackbar
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: darkMode ? "#2C2F33" : "#FFFFFF",
        color: darkMode ? "#FFFFFF" : "#000000",
        fontSize: "4rem",
        fontFamily: "monospace",
        fontWeight: "bold",
        position: "relative",
      }}
    >
      {/* Кнопка переключения темы в правую часть */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton onClick={() => setDarkMode(!darkMode)} style={{ fontSize: "36px" }}>
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </div>

      {/* Отображение таймера */}
      {!timerEnded ? (
        <div>{formatTime(timeLeft)}</div>
      ) : (
        <div
          style={{
            backgroundColor: darkMode ? "#444" : "#f4f4f4",
            padding: "10px 20px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: darkMode ? "0 4px 8px rgba(0, 0, 0, 0.5)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: darkMode ? "#FFFFFF" : "#000000",
              textDecoration: "none",
            }}
          >
            IP: <span style={{ cursor: "pointer" }} onClick={handleCopy}>btlcho.ru</span>
          </p>
          <IconButton onClick={handleCopy} style={{ color: darkMode ? "#FFFFFF" : "#000000" }}>
            <FileCopy />
          </IconButton>
        </div>
      )}

      {/* Иконки для Discord и Telegram под таймером */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <IconButton onClick={() => window.open("https://discord.gg/Qqr8k2WXmh", "_blank")} style={{ color: "#7289DA", fontSize: "36px" }}>
          <FaDiscord size={30} />
        </IconButton>
        <IconButton onClick={() => window.open("https://t.me/battlechoice", "_blank")} style={{ color: "#0088cc", fontSize: "36px" }}>
          <FaTelegram size={30} />
        </IconButton>
      </div>

      {/* Snackbar уведомление */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="IP адрес скопирован!"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </div>
  );
};

export default CountdownTimer;
